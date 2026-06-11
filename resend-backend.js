/**
 * PILATEQ - Resend Email Backend
 * ================================
 * 
 * This is a minimal Express server that receives contact form submissions
 * and sends them via Resend. Deploy this on your server (Vercel, Railway,
 * Render, or any Node.js host).
 * 
 * Setup:
 * 1. npm install express cors resend
 * 2. Set RESEND_API_KEY environment variable
 * 3. Update RESEND_FROM_EMAIL with your verified domain
 * 4. node resend-backend.js
 * 
 * The frontend expects this API at: /api/send
 */

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// CORS: Allow your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-domain.com',
  methods: ['POST'],
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Send email endpoint
app.post('/api/send', async (req, res) => {
  try {
    const { name, email, studio, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        error: 'Name and email are required',
      });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Pilateq <onboarding@resend.dev>',
      to: 'info@pilateq.de',
      replyTo: email,
      subject: `New Pilateq Trial Request from ${name}`,
      html: `
        <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FAF6F0;">
          <div style="background: white; border-radius: 24px; padding: 40px;">
            <h1 style="color: #4A3427; font-size: 24px; margin-bottom: 24px; font-family: 'Cormorant Garamond', serif;">
              New Trial Request
            </h1>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #C4956A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
                <td style="padding: 12px 0; color: #4A3427; font-size: 15px;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #F0EAE0;">
                <td style="padding: 12px 0; color: #C4956A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 12px 0; color: #4A3427; font-size: 15px;">${email}</td>
              </tr>
              <tr style="border-top: 1px solid #F0EAE0;">
                <td style="padding: 12px 0; color: #C4956A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Studio</td>
                <td style="padding: 12px 0; color: #4A3427; font-size: 15px;">${studio || 'Not provided'}</td>
              </tr>
              <tr style="border-top: 1px solid #F0EAE0;">
                <td style="padding: 12px 0; color: #C4956A; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #4A3427; font-size: 15px;">${message || 'No message'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #F0EAE0;">
              <p style="color: #4A3427; font-size: 13px; opacity: 0.5;">
                Sent from pilateq.de contact form
              </p>
            </div>
          </div>
        </div>
      `,
      text: `New Pilateq Trial Request\\n\\nName: ${name}\\nEmail: ${email}\\nStudio: ${studio || 'N/A'}\\nMessage: ${message || 'No message'}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.json({ success: true, messageId: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Pilateq email server running on port ${PORT}`);
});
