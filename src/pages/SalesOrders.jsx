import { useState } from 'react';
import SalesOrderForm from '../components/SalesOrders/SalesOrderForm';

const initialSalesOrders = [
  {
    id: 'SO-2024-001',
    customer: 'ABC Industries Ltd.',
    customerPONumber: 'PO-ABC-2024-001',
    deliveryLocation: 'Factory Complex, Industrial Area',
    poIssueDate: '2024-01-15',
    status: 'completed',
    linkedQuotation: 'QT-2024-001',
    projectId: 'PRJ-2024-001',
    uploadedPDF: { name: 'PO-ABC-2024-001.pdf' },
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'SO-2024-002',
    customer: 'XYZ Corporation',
    customerPONumber: 'PO-XYZ-2024-002',
    deliveryLocation: 'Construction Site, Downtown',
    poIssueDate: '2024-01-14',
    status: 'draft',
    linkedQuotation: '',
    projectId: '',
    uploadedPDF: { name: 'PO-XYZ-2024-002.pdf' },
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 'SO-2024-003',
    customer: 'Tech Solutions Pvt Ltd',
    customerPONumber: 'PO-TECH-2024-001',
    deliveryLocation: 'Office Building, Tech Park',
    poIssueDate: '2024-01-13',
    status: 'pending',
    linkedQuotation: 'QT-2024-003',
    projectId: 'PRJ-2024-003',
    uploadedPDF: { name: 'PO-TECH-2024-001.pdf' },
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function SalesOrders() {
  const [salesOrders, setSalesOrders] = useState(initialSalesOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingSalesOrder, setEditingSalesOrder] = useState(null);

  const filteredSalesOrders = salesOrders.filter(salesOrder => {
    const matchesSearch = salesOrder.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salesOrder.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salesOrder.customerPONumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || salesOrder.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveSalesOrder = (salesOrderData, action) => {
    if (editingSalesOrder) {
      // Update existing sales order
      setSalesOrders(prev => prev.map(so => 
        so.id === editingSalesOrder.id ? salesOrderData : so
      ));
    } else {
      // Add new sales order
      setSalesOrders(prev => [...prev, salesOrderData]);
    }
    
    setShowForm(false);
    setEditingSalesOrder(null);
    
    // Show success message based on action
    if (action === 'complete') {
      alert(`Sales Order saved and Project ${salesOrderData.projectData.id} created successfully!`);
    } else {
      alert('Sales Order saved as draft successfully!');
    }
  };

  const handleEditSalesOrder = (salesOrder) => {
    setEditingSalesOrder(salesOrder);
    setShowForm(true);
  };

  const handleDeleteSalesOrder = (salesOrderId) => {
    if (confirm('Are you sure you want to delete this sales order?')) {
      setSalesOrders(prev => prev.filter(so => so.id !== salesOrderId));
    }
  };

  const handleMarkComplete = (salesOrder) => {
    if (confirm('Mark this sales order as complete? This will create a project automatically.')) {
      const updatedSalesOrder = {
        ...salesOrder,
        status: 'completed',
        projectId: `PRJ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        updatedAt: new Date().toISOString()
      };
      setSalesOrders(prev => prev.map(so => 
        so.id === salesOrder.id ? updatedSalesOrder : so
      ));
      alert(`Sales Order marked complete and Project ${updatedSalesOrder.projectId} created!`);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingSalesOrder(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <SalesOrderForm
          salesOrder={editingSalesOrder}
          onSave={handleSaveSalesOrder}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Orders</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage sales orders and automatically create projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            New Sales Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search sales orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sales Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  PO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  PO Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Delivery Location
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
              {filteredSalesOrders.map((salesOrder) => (
                <tr key={salesOrder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {salesOrder.id}
                      </div>
                      {salesOrder.projectId && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Project: {salesOrder.projectId}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{salesOrder.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{salesOrder.customerPONumber}</div>
                    {salesOrder.uploadedPDF && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        📎 {salesOrder.uploadedPDF.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {salesOrder.poIssueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {salesOrder.deliveryLocation}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[salesOrder.status]}`}>
                      {salesOrder.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditSalesOrder(salesOrder)}
                        title="View/Edit"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        <span className="text-lg">👁️</span>
                      </button>
                      <button 
                        onClick={() => handleEditSalesOrder(salesOrder)}
                        title="Edit"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        <span className="text-lg">✏️</span>
                      </button>
                      {salesOrder.status === 'draft' && (
                        <button 
                          onClick={() => handleMarkComplete(salesOrder)}
                          title="Mark Complete"
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          <span className="text-lg">✅</span>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteSalesOrder(salesOrder.id)}
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
      {filteredSalesOrders.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">📋</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No sales orders found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new sales order with customer PO.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                New Sales Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}