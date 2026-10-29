import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Get in touch</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-navy-900 mb-6">MTSA Holdings</h2>
          <p className="text-stone-600 mb-8">
            Property Management and Business Services. Reach out for a demonstration of the full Property Management Software or to discuss implementation for your agency.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="text-gold-500" size={18} />
              <span>Contact MTSA Holdings for enquiries</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-gold-500" size={18} />
              <span>South Africa</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h3 className="font-semibold text-navy-900 mb-2">Preview completed — message not sent</h3>
              <p className="text-sm text-stone-500">This is a demonstration form and does not send messages. Contact MTSA Holdings through its official channels when supplied.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  required
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                <input
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold rounded-lg">
                <Send size={16} /> Preview Enquiry (Demo)
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
