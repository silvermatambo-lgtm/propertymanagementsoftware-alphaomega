# MTSA Property Management Software

Property software under **MTSA Holdings**: property management, deal makers, business brokers, media and online media.

## Demonstration Modules

- Buildings: editable addresses, units, bank/trust account references and trustee WhatsApp contact.
- Tenants and Owners: contact details, assigned properties, leases, balances and deposits.
- Invoices, payments, arrears and printable tenant statements.
- Cashbook: receipts, expenses and manual entries, by property and account.
- Expenses: trustee WhatsApp approval-request draft and manually recorded approval/rejection.
- Reports: rentroll, trust deposits, income/expenditure, Trial Balance (TB), General Ledger (GL), and Owners' Statement.

**Important:** This is only a demonstration. Records are saved in the current browser, not a shared database. Do not enter real tenant, owner, ID, full bank-account, or confidential trust-account data. The presentation login is not secure production authentication.

Accounting reports are illustrative. They exclude verified opening balances, bank reconciliation, VAT treatments, ownership allocations and proper trust accounting audit controls. Do not issue them as statutory or audited financial reports.

## Deployment

Production project on Vercel: https://mtsa-property-management-software.vercel.app/

The existing repository auto-deploys on pushes to main. React 18, Vite, TypeScript and Tailwind CSS. Build command: npm run typecheck && npm run build.

Existing localStorage key retained to preserve browser-only demo records: alpha_omega_rent_data_v1.

## Branding

Primary navy and gold. MTSA logo: public/mtsa-logo.svg.

Designed by WebDevPro.
