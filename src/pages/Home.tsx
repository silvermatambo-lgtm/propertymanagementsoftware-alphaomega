import { Link } from 'react-router-dom';
import { Building2, FileText, Users, AlertTriangle, Wallet, MessageCircle, Shield, BarChart3, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: Building2, title: 'Multi-Building', desc: 'Each building has its own tenants, balances, levies or rentals — fully separated.' },
  { icon: FileText, title: 'Invoices & Statements', desc: 'Raise debits, recurring invoices, detailed statements and email/WhatsApp delivery.' },
  { icon: Users, title: 'Tenant Ledgers', desc: 'Full ledger cards showing every debit and payment per tenant per month.' },
  { icon: AlertTriangle, title: 'Arrears Control', desc: 'Arrears reports, reminder letters, interest on arrears and late payment penalties.' },
  { icon: Wallet, title: 'Trust Accounts', desc: 'Track deposits held in trust and produce Trust Account reports with ownership breakdown.' },
  { icon: BarChart3, title: 'Reports', desc: 'Rentroll, Income & Expenditure, Auditor’s Report for tax, and Financial Statements.' },
  { icon: MessageCircle, title: 'WhatsApp Enabled', desc: 'Send statements and reminders directly via WhatsApp to tenants.' },
  { icon: Shield, title: 'User Rights', desc: 'Control cashier access, read-only users and multiple bank / trust accounts.' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0a2540 0%, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">Property Management · Deal Makers · Business Brokers · Online Media</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              MTSA Holdings<br />
              <span className="text-gold-400">Property Management</span>
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-xl">
              MTSA Holdings brings property management, deal making, business brokerage and online media under one name. This platform provides rent and levy management for managing agents. Track monies owed, rental income, expenses, deposits in trust, arrears and produce all the reports you need — building by building.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin/login" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg transition-all hover:-translate-y-0.5">
                Launch Admin Demo <ArrowRight size={18} />
              </Link>
              <Link to="/features" className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-gold-500 text-gold-400 hover:bg-gold-500/10 font-semibold rounded-lg transition-all">
                View Features
              </Link>
            </div>
            <p className="mt-6 text-stone-500 text-sm">Demo password: <span className="text-gold-400 font-mono">280385</span> · Data stored in your browser</p>
          </div>
          <div className="hidden lg:flex justify-center">
            <img src="/mtsa-logo.svg" alt="MTSA Holdings" className="w-72 h-72 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Overview from original system description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-2">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Overview of the Rent-It System
            </h2>
            <div className="w-14 h-1 bg-gold-500 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-stone-600 leading-relaxed">
            <div className="space-y-4">
              <p>The Property Management System enables Managing Agents to keep track of monies owed by the Tenant to the Landlord, as well as monies collected (Rental Income) and that spent (Expenses) on behalf of the Landlord.</p>
              <p>This is done by raising debits on the Tenants’ accounts and sending out detailed statements (optional) and posting details of rentals paid. The Rentroll reflects these details for all the tenants of the building.</p>
              <p>The Managing Agent can also post details of expenses paid out, e.g. electricity, rates, repairs, and print a Financial/Disbursement (Income and Expenditure) Statement reflecting all income/expenses.</p>
              <p>Track is kept of all deposits held in trust on behalf of the Tenants. The Trust Account report reflects the monies held in your Bank Account and the breakdown of to whom that money belongs.</p>
            </div>
            <div className="space-y-4">
              <p>An important aspect is controlling the collection of outstanding amounts (arrears). The Managing Agent is able to print Arrears Reports, Reminder Letters, raise Interest on Arrears (for the Landlord) and Late Payment Penalty (for your account).</p>
              <p>Tenant Ledge Cards can be viewed/printed out reflecting details of debits raised and payments made for each month of the range selected.</p>
              <p>The Auditor’s Report can be printed for any building showing the Income/Expenditure for each month of the twelve month period (for tax purposes).</p>
              <p>If a Sectional Title owner is renting out his unit, on receipt of the rent from the tenant, the owner’s levy record is automatically credited with the outstanding amounts owed to the Body-Corporate. The system handles multiple Trust Accounts as well as multiple Bank Accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-2">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Everything you need to manage rent & levies
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center mb-4">
                  <f.icon className="text-gold-400" size={22} />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/features" className="inline-flex items-center gap-2 text-gold-600 font-semibold hover:text-gold-500">
              Explore all features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to explore the demo?
          </h2>
          <p className="text-stone-300 mb-8">
            Log in with the presentation password and walk through buildings, tenants, invoices, arrears and reports. All data is stored locally in your browser.
          </p>
          <Link to="/admin/login" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-lg transition-all">
            Open Admin Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
