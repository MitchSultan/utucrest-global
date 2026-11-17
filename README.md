# Utu Crest Global Workforce

A responsive recruitment and workforce-solutions website built with Next.js App Router, React, TypeScript, and Tailwind CSS 4.

## Project structure

- `app/` — route pages, layouts, metadata, and global styles.
- `components/layout/` — shared header, mobile navigation, footer, and site shell.
- `components/sections/` — reusable page sections, job listings, application and inquiry forms.
- `components/ui/` — shared buttons, badges, statuses, and headings.
- `content/` — editable navigation, service, job, insight, and brand data.
- `lib/` — shared types, formatting utilities, and metadata helpers.
- `public/` — logo and local campaign imagery.

## Main routes

- `/` — homepage and primary candidate/employer pathways.
- `/jobs` and `/jobs/[slug]` — searchable roles and job details.
- `/candidates` and `/employers` — audience-specific information.
- `/services` and `/services/[slug]` — workforce services.
- `/training`, `/impact`, `/about`, and `/contact` — supporting company pages.
- `/insights` and `/insights/[slug]` — guidance articles.
- `/privacy` and `/terms` — current website notices.

## Local development

```bash
npm ci
npm run dev
```

## Maintenance mode

The site is normally available. To show the maintenance page, set the server-side environment variable `MAINTENANCE_MODE` to the exact value `true`.

- **Vercel:** In Project Settings → Environment Variables, set `MAINTENANCE_MODE=true` for the deployment environment, then redeploy. To restore the site, change it to `false` (or remove it) and redeploy.
- **Local:** Add `MAINTENANCE_MODE=true` to `.env.local` and restart the dev server; use `false` or remove the variable to turn it off.

The proxy serves the maintenance page with HTTP `503` and leaves Next.js assets and public files accessible. Changing a Vercel environment variable affects new deployments, so a redeploy is required.

### Client preview bypass

To let a client view the normal site while maintenance mode is on, configure a strong `MAINTENANCE_BYPASS_SECRET` (at least 32 characters) in Vercel and in your local shell. Keep it private and do not use a `NEXT_PUBLIC_` variable. Generate a secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` and add the same value to the relevant Vercel environment.

Generate a signed preview link that expires after seven days:

```powershell
$env:MAINTENANCE_BYPASS_SECRET = "your-configured-secret"
npm run maintenance:link -- https://your-site.example
```

Share the printed URL with the client. Opening it sets a secure, HTTP-only preview cookie and removes the token from the address bar; the client can then navigate the site normally. The link is a bearer credential—share it only with the intended client. Changing the secret revokes outstanding links.

Run the production checks with:

```bash
npm run lint
npm run build
npm run start
```

## Before launch

- Confirm every job, date, location, employer description, and application requirement in `content/jobs.ts`.
- Review all service, company, and article copy for accuracy and approval.
- Connect applications and inquiries to the agency’s CRM or an approved server-side form service. Current forms open a prefilled email draft and do not submit or store data on the website.
- Have the privacy notice and terms reviewed for the operating jurisdiction and actual production data flows.
- Add approved social URLs, verified testimonials or outcomes, and final brand imagery only when available.
- Confirm production domain, email, phone, and office details in `content/site.ts`.
