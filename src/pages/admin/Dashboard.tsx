import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData, formatCurrency, Building, Tenant, Invoice } from '../../lib/store';
import { Building2, Users, AlertTriangle, FileText, TrendingUp, Wallet } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(getData());

  useEffect(() => {
    setData(getData());
  }, []);

  const totalOwed = data.tenants.reduce((s, t) => s + t.balance, 0);
  const totalDeposits = data.tenants.reduce((s, t) => s + t.deposit, 0);
  const arrearsCount = data.tenants.filter((t) => t.status === 'arrears').length;
  const openInvoices = data.invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').length;
  const upcomingRenewals = data.tenants.filter((t) => {
    if (!t.renewalDate) return false;
    const d = new Date(t.renewalDate);
    const now = new Date();
    const in90 = new Date();
    in90.setDate(in90.getDate() + 90);
    return d >= now && d <= in90;
  });

  const cards = [
    { label: 'Buildings', value: data.buildings.length, icon: Building2, color: 'bg-blue-500', to: '/admin/buildings' },
    { label: 'Tenants', value: data.tenants.length, icon: Users, color: 'bg-emerald-500', to: '/admin/tenants' },
    { label: 'In Arrears', value: arrearsCount, icon: AlertTriangle, color: 'bg-red-500', to: '/admin/arrears' },
    { label: 'Open Invoices', value: openInvoices, icon: FileText, color: 'bg-amber-500', to: '/admin/invoices' },
    { label: 'Total Owed', value: formatCurrency(totalOwed), icon: TrendingUp, color: 'bg-purple-500', to: '/admin/arrears' },
    { label: 'Deposits in Trust', value: formatCurrency(totalDeposits), icon: Wallet, color: 'bg-cyan-500', to: '/admin/reports' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Portfolio overview · Data last updated {new Date(data.lastUpdated).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="text-white" size={18} />
            </div>
            <p className="text-xs text-stone-500 font-medium">{c.label}</p>
            <p className="text-lg font-bold text-navy-900 mt-0.5">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Buildings summary */}
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="font-semibold text-navy-900 mb-4">Buildings</h2>
          <div className="space-y-3">
            {data.buildings.map((b: Building) => {
              const tenants = data.tenants.filter((t) => t.buildingId === b.id);
              const owed = tenants.reduce((s, t) => s + t.balance, 0);
              return (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-navy-900">{b.name}</p>
                    <p className="text-xs text-stone-500 capitalize">{b.type} · {tenants.length} tenants</p>
                  </div>
                  <p className={`text-sm font-semibold ${owed > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {formatCurrency(owed)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming renewals & recent arrears */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h2 className="font-semibold text-navy-900 mb-4">Upcoming Renewals (90 days)</h2>
            {upcomingRenewals.length === 0 ? (
              <p className="text-sm text-stone-500">No renewals in the next 90 days.</p>
            ) : (
              <div className="space-y-2">
                {upcomingRenewals.map((t: Tenant) => (
                  <div key={t.id} className="flex justify-between text-sm py-1">
                    <span>{t.name} · {t.unit}</span>
                    <span className="text-stone-500">{t.renewalDate}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-5">
            <h2 className="font-semibold text-navy-900 mb-4">Overdue Invoices</h2>
            {data.invoices.filter((i: Invoice) => i.status === 'overdue').length === 0 ? (
              <p className="text-sm text-stone-500">No overdue invoices.</p>
            ) : (
              <div className="space-y-2">
                {data.invoices.filter((i: Invoice) => i.status === 'overdue').map((inv: Invoice) => {
                  const tenant = data.tenants.find((t) => t.id === inv.tenantId);
                  return (
                    <div key={inv.id} className="flex justify-between text-sm py-1">
                      <span>{tenant?.name} — {inv.description}</span>
                      <span className="text-red-600 font-medium">{formatCurrency(inv.amount)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
