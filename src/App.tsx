import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import Layout from './components/layout/Layout';
import Dashboard from './components/modules/dashboard/Dashboard';
import QuotationsModule from './components/modules/quotations/QuotationsModule';
import SalesOrdersModule from './components/modules/salesOrders/SalesOrdersModule';
import ProjectsModule from './components/modules/projects/ProjectsModule';
import WorkOrdersModule from './components/modules/workOrders/WorkOrdersModule';
import InvoicesModule from './components/modules/invoices/InvoicesModule';
import InventoryModule from './components/modules/inventory/InventoryModule';
import PayrollModule from './components/modules/payroll/PayrollModule';
import ContractorsModule from './components/modules/contractors/ContractorsModule';
import AssetsModule from './components/modules/assets/AssetsModule';
import ReportsModule from './components/modules/reports/ReportsModule';
import SettingsModule from './components/modules/settings/SettingsModule';

function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                {/* Dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Quotations */}
                <Route path="quotations/*" element={<QuotationsModule />} />
                
                {/* Sales Orders */}
                <Route path="sales-orders/*" element={<SalesOrdersModule />} />
                
                {/* Projects */}
                <Route path="projects/*" element={<ProjectsModule />} />
                
                {/* Work Orders */}
                <Route path="work-orders/*" element={<WorkOrdersModule />} />
                
                {/* Invoices */}
                <Route path="invoices/*" element={<InvoicesModule />} />
                
                {/* Inventory */}
                <Route path="inventory/*" element={<InventoryModule />} />
                
                {/* Payroll & HR */}
                <Route path="payroll/*" element={<PayrollModule />} />
                
                {/* Contractors */}
                <Route path="contractors/*" element={<ContractorsModule />} />
                
                {/* Assets */}
                <Route path="assets/*" element={<AssetsModule />} />
                
                {/* Reports */}
                <Route path="reports/*" element={<ReportsModule />} />
                
                {/* Settings */}
                <Route path="settings/*" element={<SettingsModule />} />
              </Route>
              
              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;