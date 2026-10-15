import { useState } from 'react';
import { getData, addExpense, formatCurrency, Expense } from '../../lib/store';
import { Plus } from 'lucide-react';

export default function AdminExpenses() {
  const [data, setData] = useState(getData());
  const [filterBuilding, setFilterBuilding] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    buildingId: '', category: 'repairs' as Expense['category'], description: '', amount: 0,
    date: new Date().toISOString().slice(0, 10), paidFromTrust: true,
  });

  const refresh = () => setData(getData());
  const expenses = filterBuilding ? data.expenses.filter((e) => e.buildingId === filterBuilding) : data.expenses;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({ ...form, amount: Number(form.amount) });
    setShowForm(false);
    refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Expenses</h1>
          <p className="text-sm text-stone-500">Post electricity, rates, repairs and other disbursements</p>
        </div>
        <div className="flex gap-2">
          <select className="border rounded-lg px-3 py-2 text-sm" value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)}>
            <option value="">All buildings</option>
            {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
            <Plus size={16} /> Add Expense
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
            <label className="text-xs font-medium text-stone-600">Category</label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Expense['category'] })}>
              <option value="electricity">Electricity</option>
              <option value="rates">Rates</option>
              <option value="repairs">Repairs</option>
              <option value="management">Management</option>
              <option value="insurance">Insurance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Amount</label>
            <input type="number" required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-stone-600">Description</label>
            <input required className="w-full border rounded-lg px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600">Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="sm:col-span-3 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.paidFromTrust} onChange={(e) => setForm({ ...form, paidFromTrust: e.target.checked })} />
              Paid from Trust Account
            </label>
            <button type="submit" className="px-4 py-2 bg-gold-500 text-navy-900 font-semibold rounded-lg text-sm">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Building</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Trust</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => {
              const building = data.buildings.find((b) => b.id === e.buildingId);
              return (
                <tr key={e.id} className="border-t border-stone-100">
                  <td className="px-4 py-3">{e.date}</td>
                  <td className="px-4 py-3">{building?.name}</td>
                  <td className="px-4 py-3 capitalize">{e.category}</td>
                  <td className="px-4 py-3">{e.description}</td>
                  <td className="px-4 py-3 font-semibold">{formatCurrency(e.amount)}</td>
                  <td className="px-4 py-3">{e.paidFromTrust ? 'Yes' : 'No'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
