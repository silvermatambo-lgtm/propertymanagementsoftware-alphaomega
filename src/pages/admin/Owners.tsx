import { useState } from 'react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { getData, addOwner, updateOwner, deleteOwner, Owner } from '../../lib/store';

const blank = { buildingId: '', name: '', email: '', phone: '', address: '', bankDetails: '', notes: '' };

export default function Owners() {
  const [data, setData] = useState(getData());
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [buildingId, setBuildingId] = useState('');
  const refresh = () => setData(getData());
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.buildingId || !form.name.trim()) return;
    if (editing) updateOwner(editing, form);
    else addOwner(form);
    setForm(blank); setEditing(null); setShowForm(false); refresh();
  };
  const startEdit = (o: Owner) => {
    setEditing(o.id);
    setForm({ ...blank, ...o });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const owners = data.owners.filter(o => !buildingId || o.buildingId === buildingId);

  return <div>
    <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Property Owners</h1>
        <p className="text-sm text-stone-500">Owner contacts, property assignments and statement recipients</p>
      </div>
      <button onClick={() => { setForm(blank); setEditing(null); setShowForm(!showForm); }} className="px-4 py-2 rounded-lg bg-navy-900 text-white text-sm flex gap-2 items-center"><Plus size={16}/> Add Owner</button>
    </div>
    <div className="bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs p-3 mb-5">
      Demonstration mode: owner details are stored only in this browser. Do not enter real IDs, full bank account numbers or confidential information before secure database access is enabled.
    </div>
    {showForm && <form onSubmit={submit} className="bg-white rounded-xl p-5 border mb-5 grid sm:grid-cols-2 gap-4">
      <div><label className="text-xs block mb-1">Building</label><select required value={form.buildingId} onChange={e => setForm({...form,buildingId:e.target.value})} className="w-full border rounded-lg p-2 text-sm"><option value="">Select building</option>{data.buildings.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
      {([['name','Owner full name'],['email','Email'],['phone','Phone / WhatsApp'],['address','Postal address'],['bankDetails','Bank reference (masked only)'],['notes','Notes']] as const).map(([key,label])=><div key={key}>
        <label className="text-xs block mb-1">{label}</label>
        <input required={key==='name'} type={key==='email'?'email':'text'} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full border rounded-lg p-2 text-sm" />
      </div>)}
      <div className="sm:col-span-2 flex gap-2"><button className="bg-gold-500 text-navy-900 font-semibold px-4 py-2 rounded-lg text-sm">{editing?'Update':'Save'} Owner</button><button type="button" onClick={()=>setShowForm(false)} className="border px-4 py-2 rounded-lg text-sm">Cancel</button></div>
    </form>}
    <div className="flex items-center gap-3 mb-4"><Users size={18}/><select value={buildingId} onChange={e=>setBuildingId(e.target.value)} className="border rounded-lg px-3 py-2 text-sm"><option value="">All properties</option>{data.buildings.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
    <div className="grid md:grid-cols-2 gap-4">
      {owners.map(o=><div key={o.id} className="bg-white border rounded-xl p-5">
        <div className="flex justify-between gap-2">
          <div><p className="font-bold text-navy-900">{o.name}</p><p className="text-xs text-stone-500">{data.buildings.find(b=>b.id===o.buildingId)?.name || 'Unassigned'}</p></div>
          <div className="flex gap-3"><button aria-label="Edit owner" onClick={()=>startEdit(o)}><Pencil size={16}/></button><button aria-label="Delete owner" onClick={()=>{if(window.confirm('Remove owner record?')){deleteOwner(o.id);refresh();}}}><Trash2 size={16}/></button></div>
        </div>
        <p className="text-sm mt-3">{o.email || 'No email supplied'} · {o.phone || 'No phone supplied'}</p>
        {o.address && <p className="text-xs text-stone-500 mt-2">{o.address}</p>}
        {o.bankDetails && <p className="text-xs text-stone-500 mt-2">Bank reference: {o.bankDetails}</p>}
        {o.notes && <p className="text-xs text-stone-500 mt-2">{o.notes}</p>}
      </div>)}
    </div>
    {!owners.length && <p className="bg-white border rounded-xl p-9 text-center text-sm text-stone-500">No owners yet. Add an owner and assign them to a building.</p>}
  </div>;
}