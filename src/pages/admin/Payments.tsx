import { useState } from 'react';
import { getData, addPayment, formatCurrency } from '../../lib/store';
import { Plus } from 'lucide-react';

export default function AdminPayments() {
  const [data, setData] = useState(getData());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    tenantId: '', invoiceId: '', amount: 0, date: new Date().toISOString().slice(0, 10),
    method: 'eft' as const, reference: '',
  });

  const refresh = () => setData(getData());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant = data.tenants.find((t) => t.id === form.tenantId);
    if (!tenant) return;
    addPayment({
      ...form,
      buildingId: tenant.buildingId,
      amount: Number(form.amount),
      invoiceId: form.invoiceId || undefined,
    });
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Payments</h1>
          <p className="text-sm text-stone-500">Post rental & levy receipts · reduces tenant balance automatically</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
          <Plus size={16} /> Post Payment
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 mb-6 grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-600">Tenant</label>
            <select required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
              <option value="">Select…</option>
              {data.tenants.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.unit}) — Bal: {formatCurrency(t.balance)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Amount</label>
            <input type="number" required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Date</label>
            <input type="date" required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Method</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value as any })}>
              <option value="eft">EFT</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Reference</label>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Link Invoice (optional)</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.invoiceId} onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}>
              <option value="">None</option>
              {data.invoices.filter((i) => i.status !== 'paid').map((i) => (
                <option key={i.id} value={i.id}>{i.description} — {formatCurrency(i.amount)}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3 flex gap-2">
            <button type="submit" className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold rounded-lg text-sm">Post Receipt</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Reference</th>
            </tr>
          </thead>
          <tbody>
            {data.payments.map((p) => {
              const tenant = data.tenants.find((t) => t.id === p.tenantId);
              return (
                <tr key={p.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">{p.date}</td>
                  <td className="px-4 py-3">{tenant?.name}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 capitalize">{p.method}</td>
                  <td className="px-4 py-3 text-stone-500">{p.reference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
