import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Does each building keep its own balances and tenants?',
    a: 'Yes. Every building is isolated. Tenants, invoices, payments, expenses and trust deposits belong to a specific building. You can switch between buildings or view portfolio totals on the dashboard.',
  },
  {
    q: 'Can the system handle both rentals and levies?',
    a: 'Absolutely. Buildings can be flagged as rental, levy or sectional title. For sectional title units that are rented out, receiving rent automatically credits the owner’s levy record with amounts owed to the Body Corporate.',
  },
  {
    q: 'Is WhatsApp sending supported?',
    a: 'Yes. The presentation edition includes a WhatsApp send action on statements and reminders. In production this connects to a WhatsApp Business API or deep-links to the user’s WhatsApp with a pre-filled message.',
  },
  {
    q: 'How are deposits and trust accounts handled?',
    a: 'Deposits are recorded against each tenant and appear on the Trust Account report together with a breakdown of ownership. Multiple trust and bank accounts are supported.',
  },
  {
    q: 'What reports are available?',
    a: 'Rentroll, Arrears Report, Tenant Ledger Cards, Income & Expenditure (Financial/Disbursement) Statement, Trust Account Report, and the Auditor’s Report covering any twelve-month period for tax purposes.',
  },
  {
    q: 'Can invoices go to trustees for approval?',
    a: 'Yes. Invoices can be marked with a trustee-approval status (pending / approved / rejected) before they are sent or paid.',
  },
  {
    q: 'Is there a real database?',
    a: 'This demonstration stores everything in the browser (localStorage). A production deployment would use a secure backend database, authentication and audit logging.',
  },
  {
    q: 'What is the demo admin password?',
    a: 'The temporary presentation password is 280385. You can log in from the Admin Login link in the footer or navigation.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-24 pb-20">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Help</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-navy-900 hover:bg-stone-50"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <ChevronDown size={18} className={`transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
