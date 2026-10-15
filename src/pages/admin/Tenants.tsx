import { useState } from 'react';
import { getData, addTenant, deleteTenant, formatCurrency, Tenant } from '../../lib/store';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminTenants() {
  const [data, setData] = useState(getData());
  const [filterBuilding, setFilterBuilding] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    buildingId: '', name: '', unit: '', email: '', phone: '',
    deposit: 0, balance: 0, leaseStart: '', leaseEnd: '', renewalDate: '', status: 'active' as Tenant['status'],
  });

  const refresh = () => setData(getData());
  const tenants = filterBuilding ? data.tenants.filter((t) => t.buildingId === filterBuilding) : data.tenants;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTenant({ ...form, deposit: Number(form.deposit), balance: Number(form.balance) });
    setShowForm(false);
    setForm({ buildingId: '', name: '', unit: '', email: '', phone: '', deposit: 0, balance: 0, leaseStart: '', leaseEnd: '', renewalDate: '', status: 'active' });
    refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Tenants</h1>
          <p className="text-sm text-stone-500">Manage tenants per building with lease & deposit tracking</p>
        </div>
        <div className="flex gap-2">
          <select className="border rounded-lg px-3 py-2 text-sm" value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)}>
            <option value="">All buildings</option>
            {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
            <Plus size={16} /> Add Tenant
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border p-5 mb-6 grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-600">Building</label>
            <select required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.buildingId} onChange={(e) => setForm({ ...form, buildingId: e.target.value })}>
              <option value="">Select…</option>
              {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Name</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Unit</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Phone</label>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Deposit</label>
            <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Lease Start</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.leaseStart} onChange={(e) => setForm({ ...form, leaseStart: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Lease End</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.leaseEnd} onChange={(e) => setForm({ ...form, leaseEnd: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Renewal Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.renewalDate} onChange={(e) => setForm({ ...form, renewalDate: e.target.value })} />
          </div>
          <div className="sm:col-span-3 flex gap-2">
            <button type="submit" className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold rounded-lg text-sm">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-stone-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Building / Unit</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Deposit</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Lease End</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => {
              const building = data.buildings.find((b) => b.id === t.buildingId);
              return (
                <tr key={t.id} className="border-t border-stone-100 hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-navy-900">{t.name}</td>
                  <td className="px-4 py-3">{building?.name}<br /><span className="text-xs text-stone-500">{t.unit}</span></td>
                  <td className="px-4 py-3 text-xs">{t.email}<br />{t.phone}</td>
                  <td className={`px-4 py-3 font-semibold ${t.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(t.balance)}</td>
                  <td className="px-4 py-3">{formatCurrency(t.deposit)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      t.status === 'arrears' ? 'bg-red-100 text-red-700' : t.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">{t.leaseEnd}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { if (confirm('Delete tenant?')) { deleteTenant(t.id); refresh(); } }} className="text-stone-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {tenants.length === 0 && <p className="p-8 text-center text-stone-500 text-sm">No tenants found.</p>}
      </div>
    </div>
  );
}
