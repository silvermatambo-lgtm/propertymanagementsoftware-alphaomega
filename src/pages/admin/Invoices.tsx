import { useState } from 'react';
import { getData, addInvoice, updateInvoice, formatCurrency, Invoice } from '../../lib/store';
import { Plus, CheckCircle, MessageCircle } from 'lucide-react';

export default function AdminInvoices() {
  const [data, setData] = useState(getData());
  const [filterBuilding, setFilterBuilding] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    tenantId: '', type: 'rent' as Invoice['type'], description: '', amount: 0,
    dueDate: '', recurring: true, recurringInterval: 'monthly' as const,
  });

  const refresh = () => setData(getData());
  const invoices = filterBuilding ? data.invoices.filter((i) => i.buildingId === filterBuilding) : data.invoices;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant = data.tenants.find((t) => t.id === form.tenantId);
    if (!tenant) return;
    addInvoice({
      ...form,
      buildingId: tenant.buildingId,
      amount: Number(form.amount),
      issueDate: new Date().toISOString().slice(0, 10),
      status: 'sent',
    });
    setShowForm(false);
    refresh();
  };

  const markPaid = (id: string) => {
    updateInvoice(id, { status: 'paid' });
    refresh();
  };

  const sendWhatsApp = (inv: Invoice) => {
    const tenant = data.tenants.find((t) => t.id === inv.tenantId);
    if (!tenant?.phone) return alert('No phone number for this tenant');
    const phone = tenant.phone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Dear ${tenant.name},\n\nInvoice: ${inv.description}\nAmount: ${formatCurrency(inv.amount)}\nDue: ${inv.dueDate}\n\nPlease arrange payment.\n\nAlpha Omega Rent Administration`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Invoices</h1>
          <p className="text-sm text-stone-500">Raise debits, recurring invoices & trustee approvals</p>
        </div>
        <div className="flex gap-2">
          <select className="border rounded-lg px-3 py-2 text-sm" value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)}>
            <option value="">All buildings</option>
            {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 mb-6 grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-600">Tenant</label>
            <select required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.tenantId} onChange={(e) => setForm({ ...form, tenantId: e.target.value })}>
              <option value="">Select…</option>
              {data.tenants.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.unit})</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Type</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Invoice['type'] })}>
              <option value="rent">Rent</option>
              <option value="levy">Levy</option>
              <option value="penalty">Late Penalty</option>
              <option value="interest">Interest on Arrears</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Amount (ZAR)</label>
            <input type="number" required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-stone-600">Description</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Due Date</label>
            <input type="date" required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <div className="sm:col-span-3 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.checked })} />
              Recurring monthly
            </label>
            <button type="submit" className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold rounded-lg text-sm">Create & Send</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const tenant = data.tenants.find((t) => t.id === inv.tenantId);
              return (
                <tr key={inv.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">
                    <p className="font-medium">{inv.description}</p>
                    {inv.recurring && <span className="text-xs text-stone-400">Recurring</span>}
                    {inv.trusteeApproval && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Trustee: {inv.trusteeApproval}</span>}
                  </td>
                  <td className="px-4 py-3">{tenant?.name}<br /><span className="text-xs text-stone-500">{tenant?.unit}</span></td>
                  <td className="px-4 py-3 capitalize">{inv.type}</td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3">{inv.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      inv.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                      inv.status === 'overdue' ? 'bg-red-100 text-red-700' :
                      inv.status === 'sent' ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'
                    }`}>{inv.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {inv.status !== 'paid' && (
                        <button onClick={() => markPaid(inv.id)} title="Mark paid" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button onClick={() => sendWhatsApp(inv)} title="Send via WhatsApp" className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
