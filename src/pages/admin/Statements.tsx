import { useState } from 'react';
import { getData, formatCurrency } from '../../lib/store';
import { MessageCircle, Printer } from 'lucide-react';

export default function AdminStatements() {
  const [data] = useState(getData());
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');

  const tenant = data.tenants.find((t) => t.id === selectedTenant);
  const building = tenant ? data.buildings.find((b) => b.id === tenant.buildingId) : null;
  const invoices = tenant ? data.invoices.filter((i) => i.tenantId === tenant.id) : [];
  const payments = tenant ? data.payments.filter((p) => p.tenantId === tenant.id) : [];

  // Combined ledger
  const ledger = [
    ...invoices.map((i) => ({ date: i.issueDate, desc: i.description, debit: i.amount, credit: 0, type: 'invoice' as const })),
    ...payments.map((p) => ({ date: p.date, desc: `Payment — ${p.reference || p.method}`, debit: 0, credit: p.amount, type: 'payment' as const })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  let running = 0;
  const ledgerWithBalance = ledger.map((row) => {
    running += row.debit - row.credit;
    return { ...row, balance: running };
  });

  const sendWhatsApp = () => {
    if (!tenant?.phone) return alert('No phone');
    const phone = tenant.phone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Dear ${tenant.name},\n\nYour account statement for ${building?.name} Unit ${tenant.unit}:\n\nCurrent balance: ${formatCurrency(tenant.balance)}\n\nPlease contact us if you have any queries.\n\nMTSA Holdings Property Management`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const printStatement = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Statements & Ledgers</h1>
        <p className="text-sm text-stone-500">Tenant ledger cards · print or WhatsApp statements</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select className="border rounded-lg px-3 py-2 text-sm" value={selectedBuilding} onChange={(e) => { setSelectedBuilding(e.target.value); setSelectedTenant(''); }}>
          <option value="">Select building…</option>
          {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm" value={selectedTenant} onChange={(e) => setSelectedTenant(e.target.value)} disabled={!selectedBuilding}>
          <option value="">Select tenant…</option>
          {data.tenants.filter((t) => t.buildingId === selectedBuilding).map((t) => (
            <option key={t.id} value={t.id}>{t.name} ({t.unit})</option>
          ))}
        </select>
      </div>

      {tenant && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 print:shadow-none" id="statement">
          <div className="flex justify-between items-start mb-6">
            <div>
              <img src="/mtsa-logo.svg" alt="Logo" className="h-12 mb-2" />
              <p className="font-bold text-navy-900">MTSA Holdings Property Management</p>
              <p className="text-xs text-stone-500">Property & Business Services</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-navy-900">Tenant Statement / Ledger Card</p>
              <p className="text-sm text-stone-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-xs text-stone-500 uppercase">Tenant</p>
              <p className="font-semibold">{tenant.name}</p>
              <p>{tenant.email} · {tenant.phone}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase">Property</p>
              <p className="font-semibold">{building?.name}</p>
              <p>Unit {tenant.unit}</p>
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2 text-right">Debit</th>
                <th className="px-3 py-2 text-right">Credit</th>
                <th className="px-3 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerWithBalance.map((row, i) => (
                <tr key={i} className="border-t border-stone-100">
                  <td className="px-3 py-2">{row.date}</td>
                  <td className="px-3 py-2">{row.desc}</td>
                  <td className="px-3 py-2 text-right">{row.debit ? formatCurrency(row.debit) : '—'}</td>
                  <td className="px-3 py-2 text-right text-emerald-600">{row.credit ? formatCurrency(row.credit) : '—'}</td>
                  <td className={`px-3 py-2 text-right font-medium ${row.balance > 0 ? 'text-red-600' : ''}`}>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-sm text-stone-500">Deposit held in trust</p>
              <p className="font-semibold">{formatCurrency(tenant.deposit)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-stone-500">Current Balance</p>
              <p className={`text-xl font-bold ${tenant.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(tenant.balance)}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3 print:hidden">
            <button onClick={printStatement} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
              <Printer size={16} /> Print Statement
            </button>
            <button onClick={sendWhatsApp} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg">
              <MessageCircle size={16} /> Send via WhatsApp
            </button>
          </div>
        </div>
      )}

      {!tenant && (
        <div className="bg-white rounded-xl border p-12 text-center text-stone-500">
          Select a building and tenant to view or send their statement / ledger card.
        </div>
      )}
    </div>
  );
}
