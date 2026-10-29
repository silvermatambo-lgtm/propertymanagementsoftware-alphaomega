import { Link } from 'react-router-dom';
import { Building2, FileText, Users, AlertTriangle, Wallet, BarChart3, Calendar, Send } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Buildings & Separation',
    icon: Building2,
    items: [
      'Each building maintains its own tenants, balances and history',
      'Support for pure rental buildings, levy-only complexes and sectional title',
      'Multiple bank accounts and multiple trust accounts per portfolio',
      'Automatic levy credit when rent is received for sectional title owners',
    ],
  },
  {
    title: 'Invoices & Recurring Billing',
    icon: FileText,
    items: [
      'Raise debits on tenant accounts (rent, levy, penalties, interest, other)',
      'Recurring monthly / quarterly / annual invoices',
      'Invoices for payments that can be sent to trustees for approval',
      'Draft → Sent → Paid / Overdue status workflow',
    ],
  },
  {
    title: 'Statements & Communication',
    icon: Send,
    items: [
      'Detailed tenant statements (optional per tenant)',
      'Email-enabled statements to tenants and landlords / body corporates',
      'WhatsApp-enabled sending of statements and reminders',
      'Printable statement packs for the full building',
    ],
  },
  {
    title: 'Arrears & Debtors',
    icon: AlertTriangle,
    items: [
      'Arrears reports filtered by building or portfolio',
      'Reminder letters generation',
      'Interest on arrears (for the Landlord)',
      'Late payment penalty (for the Managing Agent account)',
    ],
  },
  {
    title: 'Tenant Management',
    icon: Users,
    items: [
      'Tenant ledger cards showing debits and payments by month',
      'Lease start / end dates and renewal date tracking',
      'Deposit tracking held in trust',
      'Status flags: active, inactive, arrears',
    ],
  },
  {
    title: 'Income, Expenses & Trust',
    icon: Wallet,
    items: [
      'Post rental / levy income and expenses (electricity, rates, repairs…)',
      'Financial / Disbursement (Income & Expenditure) statements',
      'Trust Account report with breakdown of ownership',
      'Rentroll reflecting all tenants of a building',
    ],
  },
  {
    title: 'Reports & Compliance',
    icon: BarChart3,
    items: [
      'Auditor’s Report — Income/Expenditure for any 12-month period (tax)',
      'Building-level and portfolio-level summaries',
      'Export / print ready layouts',
      'User rights: cashier-only receipt posting, read-only access',
    ],
  },
  {
    title: 'Renewals & Calendar',
    icon: Calendar,
    items: [
      'Lease renewal date tracking',
      'Upcoming renewals dashboard widget',
      'Easy generation of renewal-related invoices',
    ],
  },
];

export default function Features() {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Capabilities</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Software Features
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Built from the original Property Management System specification and extended with modern invoicing, WhatsApp delivery and multi-building isolation.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {SECTIONS.map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-stone-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center">
                  <s.icon className="text-gold-400" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-navy-900">{s.title}</h2>
              </div>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-gold-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/admin/login" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg">
            Try the Admin Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
