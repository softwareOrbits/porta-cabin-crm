import { useState } from 'react';
import InvoiceForm from '../components/Invoices/InvoiceForm';

const initialInvoices = [
  {
    id: 'PI-2024-001',
    invoiceType: 'proforma',
    salesOrderId: 'SO-2024-001',
    projectId: 'PRJ-2024-001',
    invoiceDate: '2024-01-20',
    dueDate: '2024-02-20',
    amount: 50000,
    paymentReceived: 50000,
    remainingBalance: 0,
    paymentStatus: 'paid',
    description: 'First installment for ABC Industries project',
    lineItems: [
      { id: 1, description: 'Initial setup and materials', quantity: 1, unitPrice: 50000, taxRate: 18, total: 59000 }
    ],
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'PI-2024-002',
    invoiceType: 'proforma',
    salesOrderId: 'SO-2024-001',
    projectId: 'PRJ-2024-001',
    invoiceDate: '2024-01-25',
    dueDate: '2024-02-25',
    amount: 75000,
    paymentReceived: 0,
    remainingBalance: 75000,
    paymentStatus: 'pending',
    description: 'Second installment for ABC Industries project',
    lineItems: [
      { id: 2, description: 'Installation and assembly', quantity: 1, unitPrice: 75000, taxRate: 18, total: 88500 }
    ],
    createdAt: '2024-01-25T14:30:00Z'
  },
  {
    id: 'TI-2024-001',
    invoiceType: 'tax',
    salesOrderId: 'SO-2024-002',
    projectId: 'PRJ-2024-002',
    invoiceDate: '2024-02-01',
    dueDate: '2024-03-01',
    amount: 250000,
    paymentReceived: 100000,
    remainingBalance: 150000,
    paymentStatus: 'partial',
    description: 'Final tax invoice for XYZ Corporation project',
    linkedProformaInvoices: ['PI-2024-003'],
    qrCode: 'QR-1706788800000',
    zedIntegration: true,
    lineItems: [
      { id: 3, description: 'Complete office complex delivery', quantity: 1, unitPrice: 250000, taxRate: 18, total: 295000 }
    ],
    createdAt: '2024-02-01T09:00:00Z'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  partial: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

const typeColors = {
  proforma: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  tax: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
};

export default function Invoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.salesOrderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || invoice.invoiceType === typeFilter;
    const matchesStatus = statusFilter === 'all' || invoice.paymentStatus === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSaveInvoice = (invoiceData, action) => {
    if (editingInvoice) {
      setInvoices(prev => prev.map(inv => 
        inv.id === editingInvoice.id ? invoiceData : inv
      ));
    } else {
      setInvoices(prev => [...prev, invoiceData]);
    }
    
    setShowForm(false);
    setEditingInvoice(null);
    
    if (action === 'issue') {
      alert(`${invoiceData.invoiceType === 'tax' ? 'Tax' : 'Proforma'} Invoice issued successfully!`);
    } else {
      alert('Invoice saved as draft successfully!');
    }
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingInvoice(null);
  };

  const calculateTotalStats = () => {
    const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalReceived = filteredInvoices.reduce((sum, inv) => sum + inv.paymentReceived, 0);
    const totalPending = filteredInvoices.reduce((sum, inv) => sum + inv.remainingBalance, 0);
    
    return { totalAmount, totalReceived, totalPending };
  };

  const { totalAmount, totalReceived, totalPending } = calculateTotalStats();

  if (showForm) {
    return (
      <div className="space-y-6">
        <InvoiceForm
          invoice={editingInvoice}
          onSave={handleSaveInvoice}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage proforma and tax invoices
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            New Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Amount</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">✅</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Received</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalReceived.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">⏳</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pending</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="proforma">Proforma</option>
              <option value="tax">Tax Invoice</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sales Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.id}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {invoice.description}
                      </div>
                      {invoice.qrCode && (
                        <div className="text-xs text-purple-600 dark:text-purple-400">
                          QR: {invoice.qrCode}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${typeColors[invoice.invoiceType]}`}>
                      {invoice.invoiceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{invoice.salesOrderId}</div>
                    {invoice.projectId && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">{invoice.projectId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{invoice.invoiceDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Due: {invoice.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">${invoice.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 dark:text-green-400">${invoice.paymentReceived.toLocaleString()}</div>
                    {invoice.remainingBalance > 0 && (
                      <div className="text-xs text-red-600 dark:text-red-400">
                        Balance: ${invoice.remainingBalance.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[invoice.paymentStatus]}`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        title="View/Edit"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        <span className="text-lg">👁️</span>
                      </button>
                      <button 
                        onClick={() => handleEditInvoice(invoice)}
                        title="Edit"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        <span className="text-lg">✏️</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteInvoice(invoice.id)}
                        title="Delete"
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <span className="text-lg">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">📄</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No invoices found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new proforma or tax invoice.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                New Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}