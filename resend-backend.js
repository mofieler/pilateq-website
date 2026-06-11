/**
 * PILATEQ - Production Email Backend
 * ==================================
 *
 * A single Express service that:
 *   1. Serves the built Vite frontend from ./dist
 *   2. Exposes /api/send for contact form submissions via Resend
 *   3. Sends an admin notification AND a localized confirmation to the user
 *
 * Coolify deployment:
 *   - Build command: npm install && npm run build
 *   - Start command: node resend-backend.js
 *   - Required env vars: RESEND_API_KEY, RESEND_FROM_EMAIL, PUBLIC_SITE_URL
 *   - Optional env vars: ADMIN_EMAIL, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import { adminEmail, userConfirmationEmail } from './server/emailTemplates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Pilateq <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@pilateq.de';
const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://pilateq.de').replace(/\/$/, '');

const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 min
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5', 10); // 5 requests per window

// Simple in-memory rate limiter (sufficient for a single-instance VPS; use Redis for multi-instance)
const ipHits = new Map();

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

app.use(express.json({ limit: '256kb' }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Trust proxy so req.ip is correct behind Coolify/reverse proxy
app.set('trust proxy', 1);

// CORS: only needed if frontend and backend run on different origins.
// In the single-service Coolify setup, same-origin requests bypass CORS preflight.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || PUBLIC_SITE_URL,
    methods: ['POST', 'GET'],
  })
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));

const rateLimit = (ip) => {
  const now = Date.now();
  const record = ipHits.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  record.count += 1;
  ipHits.set(ip, record);

  return record.count > RATE_LIMIT_MAX;
};

const sanitize = (value, maxLength = 2000) =>
  String(value || '')
    .trim()
    .slice(0, maxLength);

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    resendConfigured: Boolean(RESEND_API_KEY && RESEND_FROM_EMAIL),
  });
});

app.post('/api/send', async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    if (rateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // Honeypot: if "website" field is filled, silently reject (basic bot protection)
    if (req.body.website) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    const name = sanitize(req.body.name, 120);
    const email = sanitize(req.body.email, 120).toLowerCase();
    const studio = sanitize(req.body.studio, 120);
    const message = sanitize(req.body.message, 3000);
    const locale = sanitize(req.body.locale, 5) || 'de';

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(503).json({ error: 'Email service is not configured.' });
    }

    const resend = new Resend(RESEND_API_KEY);
    const payload = { name, email, studio, message, locale };

    // 1. Admin notification
    const admin = adminEmail(payload, PUBLIC_SITE_URL);
    const adminResult = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });

    if (adminResult.error) {
      console.error('Resend admin email error:', adminResult.error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }

    // 2. User confirmation email
    const user = userConfirmationEmail(payload, PUBLIC_SITE_URL);
    const userResult = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject: user.subject,
      html: user.html,
      text: user.text,
    });

    if (userResult.error) {
      // Admin mail succeeded, user mail failed — log but don't fail the request
      console.error('Resend user confirmation error:', userResult.error);
    }

    res.json({
      success: true,
      messageId: adminResult.data?.id,
      confirmationSent: !userResult.error,
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// ---------------------------------------------------------------------------
// Static frontend + SPA fallback
// ---------------------------------------------------------------------------

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath, { maxAge: '1d' }));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Pilateq server running on port ${PORT}`);
  console.log(`Public URL: ${PUBLIC_SITE_URL}`);
  console.log(`Admin email: ${ADMIN_EMAIL}`);
  console.log(`Resend configured: ${Boolean(RESEND_API_KEY)}`);
});
