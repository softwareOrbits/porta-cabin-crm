import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
        <Route path="/quotations" element={<Layout title="Quotations"><Quotations /></Layout>} />
        <Route path="/sales-orders" element={<Layout title="Sales Orders"><SalesOrders /></Layout>} />
        <Route path="/projects" element={<Layout title="Projects"><Projects /></Layout>} />
        <Route path="/work-orders" element={<Layout title="Work Orders"><WorkOrders /></Layout>} />
        <Route path="/invoices" element={<Layout title="Invoices"><Invoices /></Layout>} />
        <Route path="/inventory" element={<Layout title="Inventory / Store"><Inventory /></Layout>} />
        <Route path="/payroll" element={<Layout title="Payroll & HR"><Payroll /></Layout>} />
        <Route path="/contractors" element={<Layout title="Contractors"><Contractors /></Layout>} />
        <Route path="/assets" element={<Layout title="Assets"><Assets /></Layout>} />
        <Route path="/reports" element={<Layout title="Reports"><Reports /></Layout>} />
        <Route path="/settings" element={<Layout title="Settings"><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App
