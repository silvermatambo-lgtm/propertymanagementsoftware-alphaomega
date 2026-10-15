// Alpha Omega Rent Administration - Browser Storage Layer (presentation mode)
// All data persists in localStorage. No backend required.

export type BuildingType = 'rental' | 'levy' | 'sectional';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  address: string;
  units: number;
  bankAccount?: string;
  trustAccount?: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  buildingId: string;
  name: string;
  unit: string;
  email: string;
  phone: string;
  deposit: number;
  balance: number; // positive = owed by tenant
  leaseStart: string;
  leaseEnd: string;
  renewalDate?: string;
  status: 'active' | 'inactive' | 'arrears';
  notes?: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  buildingId: string;
  type: 'rent' | 'levy' | 'expense' | 'penalty' | 'interest' | 'other';
  description: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  recurring: boolean;
  recurringInterval?: 'monthly' | 'quarterly' | 'annually';
  trusteeApproval?: 'pending' | 'approved' | 'rejected';
}

export interface Payment {
  id: string;
  tenantId: string;
  invoiceId?: string;
  buildingId: string;
  amount: number;
  date: string;
  method: 'eft' | 'cash' | 'card' | 'other';
  reference: string;
  notes?: string;
}

export interface Expense {
  id: string;
  buildingId: string;
  category: 'electricity' | 'rates' | 'repairs' | 'management' | 'insurance' | 'other';
  description: string;
  amount: number;
  date: string;
  paidFromTrust: boolean;
}

export interface AppData {
  buildings: Building[];
  tenants: Tenant[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  lastUpdated: string;
}

const STORAGE_KEY = 'alpha_omega_rent_data_v1';
const AUTH_KEY = 'alpha_omega_admin_auth';

const DEMO_DATA: AppData = {
  buildings: [
    {
      id: 'b1',
      name: 'Sunrise Apartments',
      type: 'rental',
      address: '12 Oak Avenue, Sandton, Johannesburg',
      units: 24,
      bankAccount: 'FNB ****4521',
      trustAccount: 'Trust ****8890',
      createdAt: '2024-01-15',
    },
    {
      id: 'b2',
      name: 'Harbour View Body Corporate',
      type: 'sectional',
      address: '88 Marine Drive, Cape Town',
      units: 48,
      bankAccount: 'Standard Bank ****3312',
      trustAccount: 'Trust ****7744',
      createdAt: '2023-06-01',
    },
    {
      id: 'b3',
      name: 'Greenpark Complex',
      type: 'levy',
      address: '5 Green Lane, Pretoria East',
      units: 36,
      bankAccount: 'Absa ****9901',
      trustAccount: 'Trust ****2211',
      createdAt: '2024-03-10',
    },
  ],
  tenants: [
    {
      id: 't1',
      buildingId: 'b1',
      name: 'Thabo Molefe',
      unit: 'A12',
      email: 'thabo.m@email.com',
      phone: '+27 82 111 2233',
      deposit: 15000,
      balance: 8500,
      leaseStart: '2024-02-01',
      leaseEnd: '2025-01-31',
      renewalDate: '2025-01-15',
      status: 'arrears',
    },
    {
      id: 't2',
      buildingId: 'b1',
      name: 'Sarah van der Berg',
      unit: 'B05',
      email: 'sarah.vdb@email.com',
      phone: '+27 83 444 5566',
      deposit: 12000,
      balance: 0,
      leaseStart: '2023-08-01',
      leaseEnd: '2024-07-31',
      renewalDate: '2024-07-15',
      status: 'active',
    },
    {
      id: 't3',
      buildingId: 'b2',
      name: 'Johan & Lisa Pretorius',
      unit: 'Unit 14',
      email: 'pretorius@email.com',
      phone: '+27 84 777 8899',
      deposit: 0,
      balance: 3200,
      leaseStart: '2023-01-01',
      leaseEnd: '2026-12-31',
      status: 'active',
    },
    {
      id: 't4',
      buildingId: 'b2',
      name: 'Nomsa Dlamini',
      unit: 'Unit 22',
      email: 'nomsa.d@email.com',
      phone: '+27 71 222 3344',
      deposit: 0,
      balance: 0,
      leaseStart: '2024-04-01',
      leaseEnd: '2025-03-31',
      status: 'active',
    },
    {
      id: 't5',
      buildingId: 'b3',
      name: 'Michael Chen',
      unit: 'C08',
      email: 'mchen@email.com',
      phone: '+27 76 555 6677',
      deposit: 8000,
      balance: 4500,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      renewalDate: '2024-12-15',
      status: 'arrears',
    },
  ],
  invoices: [
    {
      id: 'inv1',
      tenantId: 't1',
      buildingId: 'b1',
      type: 'rent',
      description: 'October 2025 Rent - Unit A12',
      amount: 8500,
      dueDate: '2025-10-01',
      issueDate: '2025-09-25',
      status: 'overdue',
      recurring: true,
      recurringInterval: 'monthly',
    },
    {
      id: 'inv2',
      tenantId: 't2',
      buildingId: 'b1',
      type: 'rent',
      description: 'October 2025 Rent - Unit B05',
      amount: 7200,
      dueDate: '2025-10-01',
      issueDate: '2025-09-25',
      status: 'paid',
      recurring: true,
      recurringInterval: 'monthly',
    },
    {
      id: 'inv3',
      tenantId: 't3',
      buildingId: 'b2',
      type: 'levy',
      description: 'October 2025 Levy - Unit 14',
      amount: 3200,
      dueDate: '2025-10-07',
      issueDate: '2025-09-28',
      status: 'sent',
      recurring: true,
      recurringInterval: 'monthly',
      trusteeApproval: 'approved',
    },
    {
      id: 'inv4',
      tenantId: 't5',
      buildingId: 'b3',
      type: 'levy',
      description: 'October 2025 Levy - Unit C08',
      amount: 2800,
      dueDate: '2025-10-01',
      issueDate: '2025-09-25',
      status: 'overdue',
      recurring: true,
      recurringInterval: 'monthly',
    },
    {
      id: 'inv5',
      tenantId: 't1',
      buildingId: 'b1',
      type: 'penalty',
      description: 'Late Payment Penalty - Oct 2025',
      amount: 425,
      dueDate: '2025-10-15',
      issueDate: '2025-10-08',
      status: 'sent',
      recurring: false,
    },
  ],
  payments: [
    {
      id: 'p1',
      tenantId: 't2',
      invoiceId: 'inv2',
      buildingId: 'b1',
      amount: 7200,
      date: '2025-09-28',
      method: 'eft',
      reference: 'RENT-B05-OCT',
    },
    {
      id: 'p2',
      tenantId: 't4',
      buildingId: 'b2',
      amount: 3100,
      date: '2025-09-30',
      method: 'eft',
      reference: 'LEVY-U22-SEP',
    },
  ],
  expenses: [
    {
      id: 'e1',
      buildingId: 'b1',
      category: 'repairs',
      description: 'Plumbing repair - Unit A12 bathroom',
      amount: 2450,
      date: '2025-09-15',
      paidFromTrust: true,
    },
    {
      id: 'e2',
      buildingId: 'b2',
      category: 'electricity',
      description: 'Common area electricity - September',
      amount: 18750,
      date: '2025-09-30',
      paidFromTrust: true,
    },
    {
      id: 'e3',
      buildingId: 'b1',
      category: 'rates',
      description: 'Municipal rates - Q3 2025',
      amount: 42000,
      date: '2025-09-20',
      paidFromTrust: false,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

function load(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {}
  // Seed demo data on first load
  save(DEMO_DATA);
  return DEMO_DATA;
}

function save(data: AppData) {
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getData(): AppData {
  return load();
}

export function resetToDemo() {
  save(DEMO_DATA);
  return DEMO_DATA;
}

// Auth (simple presentation login)
export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function login(password: string): boolean {
  if (password === '280385') {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

// CRUD helpers
export function addBuilding(b: Omit<Building, 'id' | 'createdAt'>): Building {
  const data = load();
  const building: Building = {
    ...b,
    id: 'b' + Date.now(),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  data.buildings.push(building);
  save(data);
  return building;
}

export function updateBuilding(id: string, updates: Partial<Building>) {
  const data = load();
  const idx = data.buildings.findIndex((b) => b.id === id);
  if (idx >= 0) {
    data.buildings[idx] = { ...data.buildings[idx], ...updates };
    save(data);
  }
}

export function deleteBuilding(id: string) {
  const data = load();
  data.buildings = data.buildings.filter((b) => b.id !== id);
  data.tenants = data.tenants.filter((t) => t.buildingId !== id);
  data.invoices = data.invoices.filter((i) => i.buildingId !== id);
  data.payments = data.payments.filter((p) => p.buildingId !== id);
  data.expenses = data.expenses.filter((e) => e.buildingId !== id);
  save(data);
}

export function addTenant(t: Omit<Tenant, 'id'>): Tenant {
  const data = load();
  const tenant: Tenant = { ...t, id: 't' + Date.now() };
  data.tenants.push(tenant);
  save(data);
  return tenant;
}

export function updateTenant(id: string, updates: Partial<Tenant>) {
  const data = load();
  const idx = data.tenants.findIndex((t) => t.id === id);
  if (idx >= 0) {
    data.tenants[idx] = { ...data.tenants[idx], ...updates };
    save(data);
  }
}

export function deleteTenant(id: string) {
  const data = load();
  data.tenants = data.tenants.filter((t) => t.id !== id);
  data.invoices = data.invoices.filter((i) => i.tenantId !== id);
  data.payments = data.payments.filter((p) => p.tenantId !== id);
  save(data);
}

export function addInvoice(inv: Omit<Invoice, 'id'>): Invoice {
  const data = load();
  const invoice: Invoice = { ...inv, id: 'inv' + Date.now() };
  data.invoices.push(invoice);
  // Update tenant balance if not paid
  if (invoice.status !== 'paid') {
    const tIdx = data.tenants.findIndex((t) => t.id === invoice.tenantId);
    if (tIdx >= 0) {
      data.tenants[tIdx].balance += invoice.amount;
      if (data.tenants[tIdx].balance > 0) data.tenants[tIdx].status = 'arrears';
    }
  }
  save(data);
  return invoice;
}

export function updateInvoice(id: string, updates: Partial<Invoice>) {
  const data = load();
  const idx = data.invoices.findIndex((i) => i.id === id);
  if (idx >= 0) {
    const old = data.invoices[idx];
    data.invoices[idx] = { ...old, ...updates };
    // If marked paid, reduce balance
    if (updates.status === 'paid' && old.status !== 'paid') {
      const tIdx = data.tenants.findIndex((t) => t.id === old.tenantId);
      if (tIdx >= 0) {
        data.tenants[tIdx].balance = Math.max(0, data.tenants[tIdx].balance - old.amount);
        if (data.tenants[tIdx].balance === 0) data.tenants[tIdx].status = 'active';
      }
    }
    save(data);
  }
}

export function addPayment(p: Omit<Payment, 'id'>): Payment {
  const data = load();
  const payment: Payment = { ...p, id: 'p' + Date.now() };
  data.payments.push(payment);
  // Reduce tenant balance
  const tIdx = data.tenants.findIndex((t) => t.id === p.tenantId);
  if (tIdx >= 0) {
    data.tenants[tIdx].balance = Math.max(0, data.tenants[tIdx].balance - p.amount);
    if (data.tenants[tIdx].balance === 0) data.tenants[tIdx].status = 'active';
  }
  // Mark linked invoice paid if fully covered (simple)
  if (p.invoiceId) {
    const iIdx = data.invoices.findIndex((i) => i.id === p.invoiceId);
    if (iIdx >= 0) data.invoices[iIdx].status = 'paid';
  }
  save(data);
  return payment;
}

export function addExpense(e: Omit<Expense, 'id'>): Expense {
  const data = load();
  const expense: Expense = { ...e, id: 'e' + Date.now() };
  data.expenses.push(expense);
  save(data);
  return expense;
}

export function getBuildingStats(buildingId: string) {
  const data = load();
  const tenants = data.tenants.filter((t) => t.buildingId === buildingId);
  const invoices = data.invoices.filter((i) => i.buildingId === buildingId);
  const payments = data.payments.filter((p) => p.buildingId === buildingId);
  const expenses = data.expenses.filter((e) => e.buildingId === buildingId);
  const totalOwed = tenants.reduce((s, t) => s + t.balance, 0);
  const totalDeposits = tenants.reduce((s, t) => s + t.deposit, 0);
  const income = payments.reduce((s, p) => s + p.amount, 0);
  const expenseTotal = expenses.reduce((s, e) => s + e.amount, 0);
  return {
    tenantCount: tenants.length,
    arrearsCount: tenants.filter((t) => t.status === 'arrears').length,
    totalOwed,
    totalDeposits,
    income,
    expenseTotal,
    net: income - expenseTotal,
    openInvoices: invoices.filter((i) => i.status === 'sent' || i.status === 'overdue').length,
  };
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(n);
}
