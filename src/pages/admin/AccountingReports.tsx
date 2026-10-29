import { useState } from 'react';
import { AppData, formatCurrency } from '../../lib/store';
import { buildJournal, trialBalance, ownerStatement } from '../../lib/financials';

type Report = 'tb' | 'gl' | 'owner';
export default function AccountingReports({ data, buildingId, reportType }: {data:AppData,buildingId:string,reportType:Report}) {
  const [ownerId,setOwnerId]=useState('');
  const [from,setFrom]=useState('');
  const [to,setTo]=useState('');
  const building=data.buildings.find(b=>b.id===buildingId);
  const owners=data.owners.filter(o=>o.buildingId===buildingId);
  const owner=owners.find(o=>o.id===ownerId)||owners[0];
  const journal=buildJournal(data,buildingId).filter(j=>(!from||j.date>=from)&&(!to||j.date<=to));
  const tb=trialBalance(journal);
  const receipts=ownerStatement(data,buildingId);
  const paymentRows=receipts.receipts.filter(p=>(!from||p.date>=from)&&(!to||p.date<=to));
  const expenseRows=receipts.expenses.filter(e=>(!from||e.date>=from)&&(!to||e.date<=to));
  const totalReceipts=paymentRows.reduce((s,p)=>s+p.amount,0);
  const totalExpense=expenseRows.reduce((s,e)=>s+e.amount,0);
  return <div>
    <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5">
      Illustrative report only. Transactions use demonstration browser records; there is no verified opening balance, VAT allocation, ownership split, bank reconciliation or audited ledger. Do not submit this as an official accounting or trust report.
    </p>
    <div className="flex flex-wrap gap-3 mb-5 print:hidden">
      {reportType==='owner'&&<select className="border rounded-lg p-2 text-sm" value={owner?.id||''} onChange={e=>setOwnerId(e.target.value)}>
        {owners.length?<>{owners.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</>:<option value="">No owner records yet</option>}
      </select>}
      <label className="text-xs">From <input type="date" className="border rounded-lg p-2 text-sm block mt-1" value={from} onChange={e=>setFrom(e.target.value)}/></label>
      <label className="text-xs">To <input type="date" className="border rounded-lg p-2 text-sm block mt-1" value={to} onChange={e=>setTo(e.target.value)}/></label>
    </div>
    {reportType==='tb'&&<div className="overflow-x-auto">
      <h3 className="font-bold text-navy-900 mb-3">Trial Balance · {building?.name}</h3>
      <table className="w-full text-sm min-w-[600px]"><thead className="bg-stone-50 text-left text-xs"><tr><th className="p-3">Code</th><th className="p-3">Account</th><th className="p-3 text-right">Closing Debit</th><th className="p-3 text-right">Closing Credit</th></tr></thead>
      <tbody>{tb.map(r=><tr key={r.account} className="border-t"><td className="p-3">{r.account}</td><td className="p-3">{r.name}</td><td className="p-3 text-right">{formatCurrency(r.closingDebit)}</td><td className="p-3 text-right">{formatCurrency(r.closingCredit)}</td></tr>)}</tbody>
      <tfoot><tr className="border-t-2 font-semibold"><td className="p-3" colSpan={2}>Totals</td><td className="p-3 text-right">{formatCurrency(tb.reduce((s,r)=>s+r.closingDebit,0))}</td><td className="p-3 text-right">{formatCurrency(tb.reduce((s,r)=>s+r.closingCredit,0))}</td></tr></tfoot></table>
    </div>}
    {reportType==='gl'&&<div className="overflow-x-auto">
      <h3 className="font-bold text-navy-900 mb-3">General Ledger · {building?.name}</h3>
      <table className="w-full text-sm min-w-[760px]"><thead className="bg-stone-50 text-left text-xs"><tr>{['Date','Account','Transaction','Description','Debit','Credit'].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead>
      <tbody>{journal.map((j,i)=><tr key={j.source+'-'+j.account+'-'+i} className="border-t"><td className="p-3">{j.date}</td><td className="p-3">{j.account} {j.accountName}</td><td className="p-3">{j.source}</td><td className="p-3">{j.description}</td><td className="p-3 text-right">{j.debit?formatCurrency(j.debit):'—'}</td><td className="p-3 text-right">{j.credit?formatCurrency(j.credit):'—'}</td></tr>)}</tbody>
      <tfoot><tr className="border-t-2 font-semibold"><td className="p-3" colSpan={4}>Journal totals</td><td className="p-3 text-right">{formatCurrency(journal.reduce((s,j)=>s+j.debit,0))}</td><td className="p-3 text-right">{formatCurrency(journal.reduce((s,j)=>s+j.credit,0))}</td></tr></tfoot></table>
    </div>}
    {reportType==='owner'&&<div>
      <h3 className="font-bold text-navy-900 mb-2">Owner Statement · {building?.name}</h3>
      {owner?<div className="text-sm text-stone-600 mb-4"><p><strong>Owner: </strong>{owner.name}</p><p>{owner.email} · {owner.phone}</p></div>:<p className="text-amber-800 text-sm mb-4">Add a property owner in the Owners section before issuing statements.</p>}
      {owners.length>1&&<p className="text-sm text-amber-800 mb-4">Multiple owners assigned: this displays whole-building amounts, not an apportioned ownership share.</p>}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[['Received',totalReceipts],['Approved / recorded expenses',totalExpense],['Net movement',totalReceipts-totalExpense]].map(([label,amt])=><div key={String(label)} className="border rounded-lg p-4"><p className="text-xs text-stone-500">{label}</p><p className="text-lg font-bold text-navy-900">{formatCurrency(Number(amt))}</p></div>)}
      </div>
      <h4 className="font-semibold text-sm mb-2">Property transactions</h4>
      <table className="w-full text-sm"><thead className="bg-stone-50 text-left text-xs"><tr><th className="p-3">Date</th><th className="p-3">Description</th><th className="p-3 text-right">Receipt</th><th className="p-3 text-right">Expense</th></tr></thead><tbody>
        {[...paymentRows.map(p=>({date:p.date,description:'Tenant receipt '+p.reference,inflow:p.amount,outflow:0})),...expenseRows.map(e=>({date:e.date,description:e.description,inflow:0,outflow:e.amount}))].sort((a,b)=>a.date.localeCompare(b.date)).map((r,i)=><tr key={i} className="border-t"><td className="p-3">{r.date}</td><td className="p-3">{r.description}</td><td className="p-3 text-right">{r.inflow?formatCurrency(r.inflow):'—'}</td><td className="p-3 text-right">{r.outflow?formatCurrency(r.outflow):'—'}</td></tr>)}
      </tbody></table>
      <p className="text-xs text-stone-500 mt-5">Property-level informational statement. Net movement is not an owner payout calculation. Excludes opening balance, unpaid invoices and unapproved trust expenses.</p>
    </div>}
  </div>;
}