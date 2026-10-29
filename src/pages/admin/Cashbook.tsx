import { useState } from 'react';
import { Plus, Printer } from 'lucide-react';
import { getData, addCashbookEntry, formatCurrency } from '../../lib/store';

type Row = {id:string,date:string,description:string,reference:string,inflow:number,outflow:number,account:'trust'|'operating',source:string};
export default function Cashbook() {
  const [data,setData]=useState(getData());
  const [buildingId,setBuildingId]=useState(data.buildings[0]?.id||'');
  const [account,setAccount]=useState<'trust'|'operating'>('trust');
  const [formOpen,setFormOpen]=useState(false);
  const [form,setForm]=useState({date:new Date().toISOString().slice(0,10),description:'',reference:'',amount:0,direction:'in' as 'in'|'out'});
  const [from,setFrom]=useState('');
  const [to,setTo]=useState('');
  const rows:Row[]=[
    ...data.payments.filter(p=>p.buildingId===buildingId).map(p=>({id:p.id,date:p.date,description:'Tenant payment',reference:p.reference,inflow:p.amount,outflow:0,account:'trust' as const,source:'Payment'})),
    ...data.expenses.filter(e=>e.buildingId===buildingId&&(!e.paidFromTrust||e.approvalStatus==='approved')).map(e=>({id:e.id,date:e.date,description:e.description,reference:e.category,inflow:0,outflow:e.amount,account:(e.paidFromTrust?'trust':'operating') as 'trust'|'operating',source:'Expense'})),
    ...data.cashbook.filter(e=>e.buildingId===buildingId).map(e=>({id:e.id,date:e.date,description:e.description,reference:e.reference,inflow:e.direction==='in'?e.amount:0,outflow:e.direction==='out'?e.amount:0,account:e.account,source:'Manual entry'}))
  ].filter(r=>r.account===account && (!from||r.date>=from)&&(!to||r.date<=to))
   .sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
  let balance=0;
  const running=rows.map(r=>{balance+=r.inflow-r.outflow;return {...r,balance};});
  const sumIn=rows.reduce((s,r)=>s+r.inflow,0),sumOut=rows.reduce((s,r)=>s+r.outflow,0);
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!buildingId||!form.description.trim()||!Number.isFinite(form.amount)||form.amount<=0)return;
    addCashbookEntry({...form,buildingId,account,amount:Number(form.amount)});
    setData(getData());setForm({...form,description:'',reference:'',amount:0});setFormOpen(false);
  };
  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div><h1 className="text-2xl font-bold text-navy-900">Cashbook Processing</h1><p className="text-sm text-stone-500">Bank receipts, expense payments and manual cashbook entries</p></div>
      <div className="flex gap-2"><button className="border rounded-lg px-3 py-2 text-sm flex items-center gap-2" onClick={()=>window.print()}><Printer size={16}/> Print</button><button className="bg-navy-900 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2" onClick={()=>setFormOpen(!formOpen)}><Plus size={16}/> Manual Entry</button></div>
    </div>
    <p className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 mb-5">
      Demo cashbook — not bank-reconciled. Opening balances are not included. Record each transaction only once: payments and approved expenses already appear automatically. Do not enter actual confidential banking data.
    </p>
    <div className="flex flex-wrap gap-3 mb-5">
      <select className="border rounded-lg p-2 text-sm" value={buildingId} onChange={e=>setBuildingId(e.target.value)}>{data.buildings.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select>
      <select className="border rounded-lg p-2 text-sm" value={account} onChange={e=>setAccount(e.target.value as 'trust'|'operating')}><option value="trust">Trust Account</option><option value="operating">Operating Bank</option></select>
      <label className="text-xs">From <input className="border rounded-lg p-2 text-sm block" type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label>
      <label className="text-xs">To <input className="border rounded-lg p-2 text-sm block" type="date" value={to} onChange={e=>setTo(e.target.value)}/></label>
    </div>
    {formOpen&&<form onSubmit={submit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white p-5 border rounded-xl mb-5">
      <label className="text-xs">Date<input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full border rounded-lg p-2 text-sm block mt-1"/></label>
      <label className="text-xs">Direction<select value={form.direction} onChange={e=>setForm({...form,direction:e.target.value as 'in'|'out'})} className="w-full border rounded-lg p-2 text-sm block mt-1"><option value="in">Receipt (In)</option><option value="out">Payment (Out)</option></select></label>
      <label className="text-xs">Amount (R)<input type="number" min="0.01" step="0.01" required value={form.amount} onChange={e=>setForm({...form,amount:Number(e.target.value)})} className="w-full border rounded-lg p-2 text-sm block mt-1"/></label>
      <label className="text-xs">Description<input required value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border rounded-lg p-2 text-sm block mt-1"/></label>
      <label className="text-xs">Reference<input value={form.reference} onChange={e=>setForm({...form,reference:e.target.value})} className="w-full border rounded-lg p-2 text-sm block mt-1"/></label>
      <div className="flex items-end gap-2"><button className="bg-gold-500 px-4 py-2 rounded-lg font-semibold text-sm">Post Entry</button><button type="button" onClick={()=>setFormOpen(false)} className="border px-3 py-2 rounded-lg text-sm">Cancel</button></div>
    </form>}
    <div className="grid grid-cols-3 gap-3 mb-5">
      {[['Receipts',sumIn],['Payments',sumOut],['Net movement',sumIn-sumOut]].map(([label,value])=><div key={String(label)} className="bg-white border rounded-xl p-4"><p className="text-xs text-stone-500">{label}</p><p className="text-lg font-bold text-navy-900">{formatCurrency(Number(value))}</p></div>)}
    </div>
    <div className="bg-white border rounded-xl overflow-x-auto"><table className="w-full text-sm min-w-[720px]">
      <thead className="bg-stone-50 text-left text-xs text-stone-500"><tr>{['Date','Source','Description','Reference','In (R)','Out (R)','Running movement (R)'].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead>
      <tbody>{running.map(r=><tr key={r.id} className="border-t"><td className="p-3">{r.date}</td><td className="p-3">{r.source}</td><td className="p-3">{r.description}</td><td className="p-3">{r.reference}</td><td className="p-3 text-right">{r.inflow?formatCurrency(r.inflow):'—'}</td><td className="p-3 text-right">{r.outflow?formatCurrency(r.outflow):'—'}</td><td className="p-3 text-right font-semibold">{formatCurrency(r.balance)}</td></tr>)}</tbody>
    </table>{!rows.length&&<p className="p-8 text-sm text-center text-stone-500">No cashbook entries for this selection.</p>}</div>
  </div>;
}