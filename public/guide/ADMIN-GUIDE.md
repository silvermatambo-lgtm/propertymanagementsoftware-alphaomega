# MTSA Property Management Software — Admin Guide

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
- Editable bank and trust account references, plus trustee WhatsApp contact (demo only)
- Quick stats: tenant count, arrears, total owed, deposits

**Add Building** creates a new isolated portfolio unit.

---

## 4. Property Owners and Tenants

- Owners: add a contact and assign them to one building in the Owners menu.
- Store only masked bank references until a secure database is connected.

## 4a. Tenants

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

## 8. Expenses and Trustee Approval

- Post electricity, rates, repairs, management fees, insurance, etc.
- Flag whether paid from the Trust Account
- From-trust expenses start pending. Open a WhatsApp approval draft for the trustee, then manually record approved or rejected. WhatsApp does not transmit automatically and receipt is not verified.
- Pending and rejected trust expenses do not enter the demonstration GL.

---

## 9. Cashbook and Statements

Cashbook shows recorded tenant payments, eligible expenses, and any manual entries. Filter by building, trust/operating account and dates. It is NOT reconciled against a bank statement. Do not post a manual duplicate of an existing payment.

### Statements & Tenant Ledgers

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
| **Auditor’s Report** | Demonstration summary; not independently audited | 
| **Trial Balance (TB)** | Balanced illustrative account closing amounts based on demo transactions |
| **General Ledger (GL)** | Debit/credit entries created from demo invoices, payments and expenses |
| **Owners' Statement** | Property-level receipts/expenses for owners; not an individual ownership allocation |

All reports are printable. These are not compliant or audited trust-account financial statements: opening balances, VAT, allocations, journal rules and bank reconciliation must be verified.

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

This presentation edition uses a publicly known single admin password. It is NOT safe for real financial or personal records. Production requires server-side role-based permissions, a secure shared database and audit logs.

---

## 13. Data & Reset

- Data lives in `localStorage` under the key `alpha_omega_rent_data_v1`
- To reset to the original demo data, clear site data for this domain or call `resetToDemo()` from the browser console

---

## 14. Deployment (Vercel)

1. Push the project to a GitHub repository
2. Import into Vercel
3. Framework Preset: **Vite**
4. Build Command: `npm run typecheck && npm run build`
5. Output Directory: `dist`
6. Deploy

The included `vercel.json` already handles SPA routing.

---

© MTSA Holdings
