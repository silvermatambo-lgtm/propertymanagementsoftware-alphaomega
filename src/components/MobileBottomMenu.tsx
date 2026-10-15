import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Phone, LogIn } from 'lucide-react';

export default function MobileBottomMenu() {
  const { pathname } = useLocation();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  const items = [
    { label: 'Home', to: '/', icon: <Home size={20} /> },
    { label: 'Features', to: '/features', icon: <Layers size={20} /> },
    { label: 'Admin', to: '/admin/login', icon: <LogIn size={20} /> },
    { label: 'Contact', to: '/contact', icon: <Phone size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-navy-900 border-t border-navy-800 pb-safe">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = item.to && pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                active ? 'text-gold-400' : 'text-stone-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
