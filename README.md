# Alpha Omega Rent Administration Software

Professional rent and levy management for Managing Agents.

Built with React 18 + TypeScript + Vite + Tailwind CSS. Presentation edition uses browser localStorage (no backend required).

## Features

- Multi-building isolation (rentals, levies, sectional title)
- Tenant ledgers, invoices (including recurring), payments
- Arrears control with interest & late penalties
- Trust account tracking and reports
- Income & Expenditure / Auditor’s reports
- WhatsApp-enabled statements and reminders
- Printable statements and reports
- Admin guide (downloadable)

## Demo Login

- URL: `/admin/login`
- Password: `280385`

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in Vercel
3. Framework: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`

`vercel.json` is included for SPA routing support.

## Branding

- Logo: `public/logo.png`
- Primary colour: Navy `#0a2540`
- Accent: Gold `#c9a84c`

## Data

All demo data is seeded on first load and stored in `localStorage` under the key `alpha_omega_rent_data_v1`.

© Alpha and Omega Professional Accountants and Tax Advisors
