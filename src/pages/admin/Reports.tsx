import { useState } from 'react';
import { getData, formatCurrency, getBuildingStats } from '../../lib/store';
import { Printer } from 'lucide-react';
import AccountingReports from './AccountingReports';

export default function AdminReports() {
  const [data] = useState(getData());
  const [buildingId, setBuildingId] = useState(data.buildings[0]?.id || '');
  const [reportType, setReportType] = useState<'rentroll' | 'trust' | 'income' | 'auditor' | 'tb' | 'gl' | 'owner'>('rentroll');

  const building = data.buildings.find((b) => b.id === buildingId);
  const stats = buildingId ? getBuildingStats(buildingId) : null;
  const tenants = data.tenants.filter((t) => t.buildingId === buildingId);
  const payments = data.payments.filter((p) => p.buildingId === buildingId);
  const expenses = data.expenses.filter((e) => e.buildingId === buildingId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Reports</h1>
        <p className="text-sm text-stone-500">Rentroll · Trust Account · Income & Expenditure · Trial Balance · General Ledger · Owners' Statements</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select className="border rounded-lg px-3 py-2 text-sm" value={buildingId} onChange={(e) => setBuildingId(e.target.value)}>
          {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm" value={reportType} onChange={(e) => setReportType(e.target.value as any)}>
          <option value="rentroll">Rentroll</option>
          <option value="trust">Trust Account Report</option>
          <option value="income">Income & Expenditure</option>
          <option value="auditor">Auditor’s Report</option>
          <option value="tb">Trial Balance (TB)</option>
          <option value="gl">General Ledger (GL)</option>
          <option value="owner">Owners’ Statement</option>
        </select>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg">
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="bg-white rounded-xl border p-6" id="report">
        <div className="flex justify-between mb-6">
          <div>
            <img src="/mtsa-logo.svg" alt="Logo" className="h-10 mb-1" />
            <p className="font-bold text-navy-900 text-sm">MTSA Property Management Software</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-navy-900 capitalize">{reportType.replace('_', ' ')} Report</p>
            <p className="text-sm text-stone-500">{building?.name}</p>
            <p className="text-xs text-stone-400">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {reportType === 'rentroll' && (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
              <tr>
                <th className="px-3 py-2">Unit</th>
                <th className="px-3 py-2">Tenant</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Balance</th>
                <th className="px-3 py-2 text-right">Deposit</th>
                <th className="px-3 py-2">Lease End</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-3 py-2">{t.unit}</td>
                  <td className="px-3 py-2 font-medium">{t.name}</td>
                  <td className="px-3 py-2 capitalize">{t.status}</td>
                  <td className={`px-3 py-2 text-right font-semibold ${t.balance > 0 ? 'text-red-600' : ''}`}>{formatCurrency(t.balance)}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(t.deposit)}</td>
                  <td className="px-3 py-2">{t.leaseEnd}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 font-semibold">
                <td className="px-3 py-2" colSpan={3}>Totals</td>
                <td className="px-3 py-2 text-right">{formatCurrency(stats?.totalOwed || 0)}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(stats?.totalDeposits || 0)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        {reportType === 'trust' && (
          <div>
            <p className="text-sm text-stone-600 mb-4">
              Trust Account: <strong>{building?.trustAccount || 'Not set'}</strong> · Bank: <strong>{building?.bankAccount || 'Not set'}</strong>
            </p>
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left text-xs text-stone-500 uppercase">
                <tr>
                  <th className="px-3 py-2">Tenant / Owner</th>
                  <th className="px-3 py-2">Unit</th>
                  <th className="px-3 py-2 text-right">Deposit Held</th>
                </tr>
              </thead>
              <tbody>
                {tenants.filter((t) => t.deposit > 0).map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-3 py-2">{t.name}</td>
                    <td className="px-3 py-2">{t.unit}</td>
                    <td className="px-3 py-2 text-right font-semibold">{formatCurrency(t.deposit)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 font-semibold">
                  <td className="px-3 py-2" colSpan={2}>Total held in trust</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(stats?.totalDeposits || 0)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {reportType === 'income' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-navy-900">Income (Payments Received)</h3>
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr><th className="px-3 py-2">Date</th><th className="px-3 py-2">Ref</th><th className="px-3 py-2 text-right">Amount</th></tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-3 py-2">{p.date}</td>
                      <td className="px-3 py-2">{p.reference}</td>
                      <td className="px-3 py-2 text-right text-emerald-600">{formatCurrency(p.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-semibold">
                    <td className="px-3 py-2" colSpan={2}>Total Income</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(stats?.income || 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-navy-900">Expenditure</h3>
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
                  <tr><th className="px-3 py-2">Date</th><th className="px-3 py-2">Description</th><th className="px-3 py-2 text-right">Amount</th></tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id} className="border-t">
                      <td className="px-3 py-2">{e.date}</td>
                      <td className="px-3 py-2">{e.description}</td>
                      <td className="px-3 py-2 text-right text-red-600">{formatCurrency(e.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-semibold">
                    <td className="px-3 py-2" colSpan={2}>Total Expenses</td>
                    <td className="px-3 py-2 text-right">{formatCurrency(stats?.expenseTotal || 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="md:col-span-2 border-t pt-4 text-right">
              <p className="text-sm text-stone-500">Net (Income − Expenditure)</p>
              <p className={`text-2xl font-bold ${(stats?.net || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(stats?.net || 0)}
              </p>
            </div>
          </div>
        )}

        {(reportType === 'tb' || reportType === 'gl' || reportType === 'owner') && (
          <AccountingReports data={data} buildingId={buildingId} reportType={reportType} />
        )}

        {reportType === 'auditor' && (
          <div>
            <p className="text-sm text-stone-600 mb-4">
              Auditor’s Report — Income & Expenditure summary for tax purposes (demonstration data for current period).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-xs text-stone-500">Total Income</p>
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(stats?.income || 0)}</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-xs text-stone-500">Total Expenditure</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(stats?.expenseTotal || 0)}</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-xs text-stone-500">Net Position</p>
                <p className="text-lg font-bold">{formatCurrency(stats?.net || 0)}</p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4">
                <p className="text-xs text-stone-500">Deposits in Trust</p>
                <p className="text-lg font-bold">{formatCurrency(stats?.totalDeposits || 0)}</p>
              </div>
            </div>
            <p className="text-xs text-stone-400">
              In a full production system this report would break down each of the twelve months of the selected financial year.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
