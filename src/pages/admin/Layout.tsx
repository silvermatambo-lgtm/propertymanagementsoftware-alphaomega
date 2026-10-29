import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, FileText, CreditCard,
  AlertTriangle, Wallet, FileBarChart, LogOut, Menu, X, BookOpen, Landmark
} from 'lucide-react';
import { useState } from 'react';
import { logout } from '../../lib/store';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/buildings', label: 'Buildings', icon: Building2 },
  { to: '/admin/tenants', label: 'Tenants', icon: Users },
  { to: '/admin/owners', label: 'Owners', icon: Users },
  { to: '/admin/cashbook', label: 'Cashbook', icon: Landmark },
  { to: '/admin/invoices', label: 'Invoices', icon: FileText },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/arrears', label: 'Arrears', icon: AlertTriangle },
  { to: '/admin/expenses', label: 'Expenses', icon: Wallet },
  { to: '/admin/statements', label: 'Statements', icon: BookOpen },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy-900 text-white shrink-0">
        <div className="p-5 border-b border-navy-800">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
            <div>
              <p className="font-bold text-sm leading-tight">MTSA Holdings</p>
              <p className="text-gold-400 text-[10px] uppercase tracking-wider">Property Management</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-gold-500/20 text-gold-400' : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-navy-800">
          <a href="/guide/ADMIN-GUIDE.md" download className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-300 hover:bg-white/5 mb-1">
            <BookOpen size={18} /> Admin Guide
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-300 hover:bg-white/5">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-navy-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="font-semibold text-sm">MTSA Property Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-navy-900 p-3 overflow-y-auto">
              <nav className="space-y-1 mt-12">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive ? 'bg-gold-500/20 text-gold-400' : 'text-stone-300'
                      }`
                    }
                  >
                    <item.icon size={18} />
                    {item.label}
                  </NavLink>
                ))}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-300 mt-4">
                  <LogOut size={18} /> Sign Out
                </button>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <p className="mb-4 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 print:hidden">Demonstration environment: records are saved only in this browser, not shared between staff. Do not enter live tenant or bank details.</p>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
