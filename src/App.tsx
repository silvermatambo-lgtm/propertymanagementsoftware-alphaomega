import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PWAInstall from './components/PWAInstall';
import MobileBottomMenu from './components/MobileBottomMenu';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBuildings from './pages/admin/Buildings';
import AdminTenants from './pages/admin/Tenants';
import AdminInvoices from './pages/admin/Invoices';
import AdminPayments from './pages/admin/Payments';
import AdminArrears from './pages/admin/Arrears';
import AdminReports from './pages/admin/Reports';
import AdminExpenses from './pages/admin/Expenses';
import AdminStatements from './pages/admin/Statements';
import AdminOwners from './pages/admin/Owners';
import AdminCashbook from './pages/admin/Cashbook';
import { isAuthenticated } from './lib/store';

function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(isAuthenticated());
  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);
  if (!auth) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ServiceWorkerRegistrar />
      <LoadingScreen />
      <ScrollToTop />

      <Routes>
        {/* Public marketing pages */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <FloatingWhatsApp />
              <PWAInstall />
              <MobileBottomMenu />
            </div>
          }
        />

        {/* Admin login (no navbar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin area */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="buildings" element={<AdminBuildings />} />
          <Route path="tenants" element={<AdminTenants />} />
          <Route path="owners" element={<AdminOwners />} />
          <Route path="cashbook" element={<AdminCashbook />} />
          <Route path="invoices" element={<AdminInvoices />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="arrears" element={<AdminArrears />} />
          <Route path="expenses" element={<AdminExpenses />} />
          <Route path="statements" element={<AdminStatements />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
