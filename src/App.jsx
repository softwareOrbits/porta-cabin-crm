import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quotations from './pages/Quotations';
import SalesOrders from './pages/SalesOrders';
import Projects from './pages/Projects';
import WorkOrders from './pages/WorkOrders';
import Invoices from './pages/Invoices';
import Inventory from './pages/Inventory';
import Payroll from './pages/Payroll';
import Contractors from './pages/Contractors';
import Assets from './pages/Assets';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Employees from './pages/Employees';
import AuditTrail from './pages/AuditTrail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout title="Dashboard"><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/quotations" element={
            <ProtectedRoute>
              <Layout title="Quotations"><Quotations /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/sales-orders" element={
            <ProtectedRoute>
              <Layout title="Sales Orders"><SalesOrders /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Layout title="Projects"><Projects /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/work-orders" element={
            <ProtectedRoute>
              <Layout title="Work Orders"><WorkOrders /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/invoices" element={
            <ProtectedRoute>
              <Layout title="Invoices"><Invoices /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute>
              <Layout title="Inventory / Store"><Inventory /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/payroll" element={
            <ProtectedRoute>
              <Layout title="Payroll & HR"><Payroll /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute>
              <Layout title="Employees"><Employees /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/contractors" element={
            <ProtectedRoute>
              <Layout title="Contractors"><Contractors /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/assets" element={
            <ProtectedRoute>
              <Layout title="Assets"><Assets /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout title="Reports"><Reports /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/audit-trail" element={
            <ProtectedRoute>
              <Layout title="Audit Trail"><AuditTrail /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout title="Settings"><Settings /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
