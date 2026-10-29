import { useState, useEffect } from 'react';
import { getData, addBuilding, updateBuilding, deleteBuilding, formatCurrency, getBuildingStats, BuildingType } from '../../lib/store';
import { Plus, Trash2, Building2, Pencil } from 'lucide-react';

export default function AdminBuildings() {
  const [data, setData] = useState(getData());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'rental' as BuildingType, address: '', units: 1, bankAccount: '', trustAccount: '', trusteePhone: '' });

  const refresh = () => setData(getData());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateBuilding(editingId, { ...form, units: Number(form.units) });
    else addBuilding({ ...form, units: Number(form.units) });
    setForm({ name: '', type: 'rental', address: '', units: 1, bankAccount: '', trustAccount: '', trusteePhone: '' });
    setEditingId(null);
    setShowForm(false);
    refresh();
  };

  const handleEdit = (id: string) => {
    const b = data.buildings.find((item) => item.id === id);
    if (!b) return;
    setForm({ name: b.name, type: b.type, address: b.address, units: b.units, bankAccount: b.bankAccount || '', trustAccount: b.trustAccount || '', trusteePhone: b.trusteePhone || '' });
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this building and all related tenants, invoices and payments?')) {
      deleteBuilding(id);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Buildings</h1>
          <p className="text-sm text-stone-500">Buildings, property addresses, bank references and trustee contact details. Demo storage only; use masked account references.</p>
        </div>
        <button onClick={() => { setEditingId(null); setShowForm(!showForm); }} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800">
          <Plus size={16} /> Add Building
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-stone-200 p-5 mb-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Name</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Type</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as BuildingType })}>
              <option value="rental">Rental</option>
              <option value="levy">Levy</option>
              <option value="sectional">Sectional Title</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-600 mb-1">Address</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Units</label>
            <input type="number" min={1} className="w-full border rounded-lg px-3 py-2 text-sm" value={form.units} onChange={(e) => setForm({ ...form, units: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Bank Account</label>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.bankAccount} onChange={(e) => setForm({ ...form, bankAccount: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Trust Account</label>
            <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.trustAccount} onChange={(e) => setForm({ ...form, trustAccount: e.target.value })} />
          </div>
          <div className="sm:col-span-2"><label className="block text-xs font-medium text-stone-600 mb-1">Trustee WhatsApp (for approval requests)</label><input type="tel" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.trusteePhone} onChange={e => setForm({...form, trusteePhone:e.target.value})} placeholder="+27..." /></div>
          <div className="sm:col-span-2 flex gap-2">
            <button type="submit" className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold rounded-lg text-sm">{editingId ? "Update Building" : "Save Building"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.buildings.map((b) => {
          const stats = getBuildingStats(b.id);
          return (
            <div key={b.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center">
                    <Building2 className="text-gold-400" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{b.name}</h3>
                    <p className="text-xs text-stone-500 capitalize">{b.type} · {b.units} units</p>
                  </div>
                </div>
                <div className="flex gap-2"><button aria-label="Edit building bank details" onClick={() => handleEdit(b.id)} className="text-stone-500 hover:text-navy-900 p-1"><Pencil size={16} /></button><button aria-label="Delete building" onClick={() => handleDelete(b.id)} className="text-stone-400 hover:text-red-500 p-1"><Trash2 size={16} /></button></div>
              </div>
              <p className="text-xs text-stone-500 mb-4">{b.address}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-stone-50 rounded-lg p-2">
                  <p className="text-xs text-stone-500">Tenants</p>
                  <p className="font-semibold">{stats.tenantCount}</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-2">
                  <p className="text-xs text-stone-500">Arrears</p>
                  <p className="font-semibold text-red-600">{stats.arrearsCount}</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-2">
                  <p className="text-xs text-stone-500">Total Owed</p>
                  <p className="font-semibold">{formatCurrency(stats.totalOwed)}</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-2">
                  <p className="text-xs text-stone-500">Deposits</p>
                  <p className="font-semibold">{formatCurrency(stats.totalDeposits)}</p>
                </div>
              </div>
              {(b.bankAccount || b.trustAccount) && (
                <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                  {b.bankAccount && <p>Bank: {b.bankAccount}</p>}
                  {b.trustAccount && <p>Trust: {b.trustAccount}</p>}
                  {b.trusteePhone && <p>Trustee WhatsApp: {b.trusteePhone}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
