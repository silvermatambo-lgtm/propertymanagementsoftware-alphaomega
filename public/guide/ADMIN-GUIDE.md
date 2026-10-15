# Alpha Omega Rent Administration Software — Admin Guide

**Presentation Edition**  
Password: `280385`

---

## 1. Getting Started

1. Open the website and click **Admin Login** in the navigation or footer.
2. Enter the password: **280385**
3. You will be taken to the Dashboard.

All data is stored in your browser’s localStorage. Clearing browser data will reset the demo to the seeded sample buildings and tenants.

---

## 2. Dashboard

Overview of the entire portfolio:

- Number of buildings, tenants, tenants in arrears, open invoices
- Total amounts owed and deposits held in trust
- Per-building balance summary
- Upcoming lease renewals (next 90 days)
- Overdue invoices list

---

## 3. Buildings

Each building is completely separate:

- Own tenants, balances, invoices, payments and expenses
- Type: **Rental**, **Levy** or **Sectional Title**
- Bank account and Trust account references
- Quick stats: tenant count, arrears, total owed, deposits

**Add Building** creates a new isolated portfolio unit.

---

## 4. Tenants

- Filter by building
- Record name, unit, email, phone, deposit, lease dates and renewal date
- Balance and status (active / arrears / inactive) update automatically when invoices and payments are posted

---

## 5. Invoices

- Raise debits: Rent, Levy, Penalty, Interest, Other
- Support for recurring monthly invoices
- Status workflow: sent → paid / overdue
- Trustee approval flag available
- **WhatsApp** button opens a pre-filled message to the tenant’s phone number
- Mark as paid reduces the tenant balance

---

## 6. Payments

- Post receipts (EFT, cash, card, other)
- Optionally link to an open invoice (marks it paid)
- Automatically reduces the tenant’s outstanding balance
- If balance reaches zero the tenant status returns to “active”

---

## 7. Arrears & Debtors

- Lists every tenant with a positive balance
- Total outstanding highlighted
- Actions per tenant:
  - **WhatsApp** reminder
  - **Raise Interest** (example 2% on outstanding)
  - **Raise Late Payment Penalty**

---

## 8. Expenses

- Post electricity, rates, repairs, management fees, insurance, etc.
- Flag whether paid from the Trust Account
- Feeds into the Income & Expenditure and Auditor reports

---

## 9. Statements & Tenant Ledgers

1. Select a building, then a tenant
2. View the full ledger card (debits and credits with running balance)
3. **Print Statement** or **Send via WhatsApp**

---

## 10. Reports

Available report types (filter by building):

| Report | Purpose |
|--------|---------|
| **Rentroll** | All tenants of the building with balances and deposits |
| **Trust Account** | Breakdown of deposits held and to whom they belong |
| **Income & Expenditure** | Payments received vs expenses (Financial / Disbursement Statement) |
| **Auditor’s Report** | Summary suitable for tax / year-end (12-month view in production) |

All reports are print-ready.

---

## 11. WhatsApp Integration

On Invoices, Arrears and Statements the WhatsApp action:

- Uses the tenant’s stored phone number
- Opens WhatsApp (web or app) with a structured pre-filled message
- In a production environment this can be upgraded to the WhatsApp Business API for automated delivery

---

## 12. User Rights (Presentation note)

The original system supports:

- Cashier-only rights (post receipts only)
- Read-only access
- Full administrator access

This presentation edition uses a single admin password. Production deployments would implement role-based access control.

---

## 13. Data & Reset

- Data lives in `localStorage` under the key `alpha_omega_rent_data_v1`
- To reset to the original demo data, clear site data for this domain or call `resetToDemo()` from the browser console

---

## 14. Deployment (Vercel)

1. Push the project to a GitHub repository
2. Import into Vercel
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

The included `vercel.json` already handles SPA routing.

---

© Alpha and Omega Professional Accountants and Tax Advisors
