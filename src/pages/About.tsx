import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Who we are</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            MTSA Holdings
          </h1>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Property Management and Business Services delivering specialised rent and levy administration tools for Managing Agents across South Africa.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex justify-center mb-10">
          <img src="/mtsa-logo.svg" alt="MTSA Holdings" className="h-32 object-contain" />
        </div>
        <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4">
          <p>
            MTSA Holdings presents MTSA Property Management Software to give Managing Agents a clear, reliable way to manage every rand that moves through a property portfolio.
          </p>
          <p>
            Whether you administer pure rental buildings, body-corporate levies or mixed sectional-title schemes where owners also rent units, the system keeps each building’s tenants, balances, deposits and expenses completely separate while still giving you portfolio-wide visibility.
          </p>
          <p>
            The software follows the proven Property Management model: raise debits, produce statements, post payments, track trust deposits, control arrears with interest and penalties, and generate the full suite of reports required by landlords, trustees and auditors.
          </p>
          <p>
            This online edition is a presentation-ready demonstration. All data lives in your browser’s local storage so you can explore every module without a backend. A full production version can be connected to a secure multi-tenant database and email/WhatsApp gateways.
          </p>
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg">
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
