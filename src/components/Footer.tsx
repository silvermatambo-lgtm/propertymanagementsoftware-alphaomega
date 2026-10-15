import { Link } from 'react-router-dom';
import { Mail, MapPin, LogIn } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Alpha and Omega" className="h-14 w-14 object-contain" />
              <div>
                <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Alpha and Omega
                </p>
                <p className="text-gold-400 text-[10px] tracking-widest uppercase">Professional Accountants</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-5">
              Complete Rent & Levy Administration Software for Managing Agents. Track tenants, invoices, statements, arrears and trust accounts — building by building.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Software</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-gold-400 transition-colors">Features</Link></li>
              <li><Link to="/faq" className="hover:text-gold-400 transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Administration</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admin/login" className="inline-flex items-center gap-2 hover:text-gold-400 transition-colors">
                  <LogIn size={14} /> Admin Login
                </Link>
              </li>
              <li>
                <a href="/guide/ADMIN-GUIDE.md" download className="hover:text-gold-400 transition-colors">
                  Download Admin Guide
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-stone-500">
              Presentation login password: <span className="text-gold-400 font-mono">280385</span>
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>info@alphaomega-accountants.co.za</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Alpha and Omega Professional Accountants and Tax Advisors. All rights reserved.</p>
          <p>Website designed by <a href="https://www.webdevpro.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">www.WebDevPro.co.za</a> | <a href="tel:+27812159792" className="hover:text-gold-400 transition-colors">+27 81 215 9792</a> | <a href="mailto:support@webdevpro.co.za" className="hover:text-gold-400 transition-colors">support@webdevpro.co.za</a></p>
        </div>
      </div>
    </footer>
  );
}
