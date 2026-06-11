# Pilateq Deployment Guide (Coolify VPS)

This project is packaged as a **single Node.js service**: the Express backend serves the built Vite frontend and handles contact form emails via Resend.

## What you need before deploying

1. A VPS with Coolify installed.
2. A domain pointing to your VPS (e.g. `pilateq.de`).
3. A [Resend](https://resend.com) account with:
   - an API key
   - a verified domain or a verified sender email address

## Coolify setup

### 1. Create a new resource

In Coolify choose **"Private Repository"** (or GitHub/GitLab integration) and point it to this repository.

### 2. Build & start settings

| Setting | Value |
|---------|-------|
| Build Command | `npm install && npm run build` |
| Start Command | `node resend-backend.js` |
| Port | `3001` |

If you use the included `Dockerfile`, Coolify can also run it as a **Docker Compose** or **Dockerfile** deployment. In that case the build/start commands above are handled by the Dockerfile itself.

### 3. Environment variables

Add these in Coolify under **Environment Variables**:

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `RESEND_API_KEY` | yes | `re_xxxxxxxxxxxx` | Your Resend API key |
| `RESEND_FROM_EMAIL` | yes | `Pilateq <info@pilateq.de>` | Verified sender address |
| `PUBLIC_SITE_URL` | yes | `https://pilateq.de` | Public domain of the site |
| `ADMIN_EMAIL` | no | `info@pilateq.de` | Where contact submissions go |
| `PORT` | no | `3001` | Server port (Coolify usually injects this) |
| `RATE_LIMIT_WINDOW_MS` | no | `900000` | Rate-limit window in ms (default 15 min) |
| `RATE_LIMIT_MAX` | no | `5` | Max submissions per IP per window |

### 4. Domain & SSL

In Coolify attach your domain to the service and enable HTTPS. The backend will automatically serve the frontend and handle `/api/*` routes.

## How it works

- `GET /api/health` — health check, also shows whether Resend is configured.
- `POST /api/send` — contact form endpoint. Sends:
  1. An admin notification to `ADMIN_EMAIL`
  2. A localized confirmation email to the user
- All other routes serve the static Vite SPA from `dist/`.

## Testing after deployment

1. Open `https://your-domain.com/contact`.
2. Fill out the form and submit.
3. Check the admin inbox (`info@pilateq.de`) for the notification email.
4. Check the submitter's inbox for the confirmation email.
5. If something fails, check the Coolify logs for `RESEND_API_KEY is not configured` or Resend error messages.

## Local testing

```bash
# 1. Install dependencies
npm install

# 2. Create local env file
cp .env.example .env
# edit .env and add your RESEND_API_KEY

# 3. Build frontend
npm run build

# 4. Start backend
npm start
```

The server runs on `http://localhost:3001`.

## Email templates

Templates live in `server/emailTemplates.js`:

- `adminEmail()` — notification sent to you when someone submits the contact form.
- `userConfirmationEmail()` — localized auto-reply sent to the user.

Both use the Pilateq brand colors, are mobile-responsive, and include a link back to the site.
