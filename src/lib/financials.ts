import { AppData } from './store';

// Illustrative double-entry journal constructed from existing demonstration transactions.
// Not a statutory trial balance: opening balances, VAT, splits, bank feeds and reconciliations
// must be imported and checked before accounting use.
export interface JournalLine {
  date: string;
  source: string;
  description: string;
  buildingId: string;
  account: string;
  accountName: string;
  debit: number;
  credit: number;
}
const accountNames: Record<string,string> = {
  '1000': 'Trust Bank (unreconciled)',
  '1010': 'Operating Bank (unreconciled)',
  '1100': 'Tenant Receivables',
  '2900': 'Unallocated Cash Receipts',
  '4000': 'Rental / Levy Income',
  '5000': 'Property Expenses',
  '5900': 'Other Cashbook Payments'
};
export const getAccountName = (code: string) => accountNames[code] || code;

export function buildJournal(data: AppData, buildingId: string): JournalLine[] {
  const result: JournalLine[] = [];
  const pair = (date:string, source:string, description:string, debitAccount:string, creditAccount:string, amount:number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    result.push({date, source, description, buildingId, account:debitAccount, accountName:getAccountName(debitAccount), debit:amount, credit:0});
    result.push({date, source, description, buildingId, account:creditAccount, accountName:getAccountName(creditAccount), debit:0, credit:amount});
  };
  data.invoices.filter(i=>i.buildingId===buildingId && i.status!=='cancelled' && i.status!=='draft')
    .forEach(i=>pair(i.issueDate,i.id,i.description,'1100','4000',i.amount));
  data.payments.filter(p=>p.buildingId===buildingId)
    .forEach(p=>pair(p.date,p.id,'Tenant receipt: '+p.reference,'1000','1100',p.amount));
  data.expenses.filter(e=>e.buildingId===buildingId && (!e.paidFromTrust || e.approvalStatus==='approved'))
    .forEach(e=>pair(e.date,e.id,e.description,'5000',e.paidFromTrust?'1000':'1010',e.amount));
  data.cashbook.filter(e=>e.buildingId===buildingId).forEach(e=>{
    const bank=e.account==='trust'?'1000':'1010';
    pair(e.date,e.id,e.description,e.direction==='in'?bank:'5900',e.direction==='in'?'2900':bank,e.amount);
  });
  return result.sort((a,b)=>a.date.localeCompare(b.date)||a.source.localeCompare(b.source));
}

export function trialBalance(rows: JournalLine[]) {
  const grouped = new Map<string,{account:string,name:string,debits:number,credits:number}>();
  rows.forEach(r=>{
    const g=grouped.get(r.account)||{account:r.account,name:r.accountName,debits:0,credits:0};
    g.debits+=r.debit; g.credits+=r.credit; grouped.set(r.account,g);
  });
  return [...grouped.values()].sort((a,b)=>a.account.localeCompare(b.account))
    .map(g=>({...g,closingDebit:Math.max(0,g.debits-g.credits),closingCredit:Math.max(0,g.credits-g.debits)}));
}

export function ownerStatement(data: AppData, buildingId: string) {
  const invoices=data.invoices.filter(i=>i.buildingId===buildingId && !['cancelled','draft'].includes(i.status));
  const receipts=data.payments.filter(p=>p.buildingId===buildingId);
  const expenses=data.expenses.filter(e=>e.buildingId===buildingId && (!e.paidFromTrust || e.approvalStatus==='approved'));
  const billed=invoices.reduce((s,i)=>s+i.amount,0);
  const received=receipts.reduce((s,p)=>s+p.amount,0);
  const paidExpenses=expenses.reduce((s,e)=>s+e.amount,0);
  return {billed, received, paidExpenses, outstanding:billed-received, net:received-paidExpenses, receipts, expenses};
}
