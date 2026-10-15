import { useState } from 'react';
import { getData, formatCurrency, addInvoice } from '../../lib/store';
import { AlertTriangle, MessageCircle, FileText } from 'lucide-react';

export default function AdminArrears() {
  const [data, setData] = useState(getData());
  const [filterBuilding, setFilterBuilding] = useState('');
  const arrears = data.tenants
    .filter((t) => t.balance > 0)
    .filter((t) => !filterBuilding || t.buildingId === filterBuilding)
    .sort((a, b) => b.balance - a.balance);

  const raiseInterest = (tenantId: string, balance: number) => {
    const interest = Math.round(balance * 0.02 * 100) / 100; // 2% example
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    addInvoice({
      tenantId,
      buildingId: tenant.buildingId,
      type: 'interest',
      description: `Interest on Arrears (${formatCurrency(balance)})`,
      amount: interest,
      dueDate: new Date().toISOString().slice(0, 10),
      issueDate: new Date().toISOString().slice(0, 10),
      status: 'sent',
      recurring: false,
    });
    setData(getData());
    alert(`Interest of ${formatCurrency(interest)} raised for ${tenant.name}`);
  };

  const raisePenalty = (tenantId: string) => {
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    const penalty = 250; // example fixed
    addInvoice({
      tenantId,
      buildingId: tenant.buildingId,
      type: 'penalty',
      description: 'Late Payment Penalty',
      amount: penalty,
      dueDate: new Date().toISOString().slice(0, 10),
      issueDate: new Date().toISOString().slice(0, 10),
      status: 'sent',
      recurring: false,
    });
    setData(getData());
    alert(`Late payment penalty of ${formatCurrency(penalty)} raised for ${tenant.name}`);
  };

  const sendReminder = (tenantId: string) => {
    const tenant = data.tenants.find((t) => t.id === tenantId)!;
    if (!tenant.phone) return alert('No phone number');
    const phone = tenant.phone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Dear ${tenant.name},\n\nThis is a reminder that your account is in arrears of ${formatCurrency(tenant.balance)}.\n\nPlease settle the outstanding amount as soon as possible.\n\nAlpha Omega Rent Administration`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Arrears & Debtors</h1>
          <p className="text-sm text-stone-500">Outstanding balances · raise interest & penalties · send reminders</p>
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm" value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)}>
          <option value="">All buildings</option>
          {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3">
        <AlertTriangle className="text-red-500" size={22} />
        <div>
          <p className="font-semibold text-red-800">{arrears.length} tenant(s) in arrears</p>
          <p className="text-sm text-red-600">Total outstanding: {formatCurrency(arrears.reduce((s, t) => s + t.balance, 0))}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Building / Unit</th>
              <th className="px-4 py-3">Balance Owed</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {arrears.map((t) => {
              const building = data.buildings.find((b) => b.id === t.buildingId);
              return (
                <tr key={t.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3">{building?.name} · {t.unit}</td>
                  <td className="px-4 py-3 font-bold text-red-600">{formatCurrency(t.balance)}</td>
                  <td className="px-4 py-3 text-xs">{t.phone}<br />{t.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button onClick={() => sendReminder(t.id)} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100">
                        <MessageCircle size={12} /> WhatsApp
                      </button>
                      <button onClick={() => raiseInterest(t.id, t.balance)} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-50 text-amber-700 rounded hover:bg-amber-100">
                        <FileText size={12} /> Interest
                      </button>
                      <button onClick={() => raisePenalty(t.id)} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100">
                        Penalty
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {arrears.length === 0 && <p className="p-8 text-center text-stone-500">No tenants currently in arrears.</p>}
      </div>
    </div>
  );
}
