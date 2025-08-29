import { useState } from 'react';
import QuotationForm from '../components/Quotations/QuotationForm';

const initialQuotations = [
  {
    id: 'QT-2024-001',
    customer: 'ABC Industries Ltd.',
    date: '2024-01-15',
    validUntil: '2024-02-15',
    amount: '$1,25,000',
    status: 'draft',
    items: 3,
  },
  {
    id: 'QT-2024-002',
    customer: 'XYZ Corporation',
    date: '2024-01-14',
    validUntil: '2024-02-14',
    amount: '$2,50,000',
    status: 'sent',
    items: 5,
  },
  {
    id: 'QT-2024-003',
    customer: 'Tech Solutions Pvt Ltd',
    date: '2024-01-13',
    validUntil: '2024-02-13',
    amount: '$75,000',
    status: 'accepted',
    items: 2,
  },
  {
    id: 'QT-2024-004',
    customer: 'Global Enterprises',
    date: '2024-01-12',
    validUntil: '2024-02-12',
    amount: '$3,00,000',
    status: 'rejected',
    items: 7,
  },
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  accepted: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

export default function Quotations() {
  const [quotations, setQuotations] = useState(initialQuotations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveQuotation = (quotationData, action) => {
    if (editingQuotation) {
      // Update existing quotation
      setQuotations(prev => prev.map(q => 
        q.id === editingQuotation.id ? quotationData : q
      ));
    } else {
      // Add new quotation
      setQuotations(prev => [...prev, quotationData]);
    }
    
    setShowForm(false);
    setEditingQuotation(null);
    
    // Show success message based on action
    if (action === 'send') {
      alert('Quotation sent to customer successfully!');
    } else {
      alert('Quotation saved as draft successfully!');
    }
  };

  const handleEditQuotation = (quotation) => {
    setEditingQuotation(quotation);
    setShowForm(true);
  };

  const handleDeleteQuotation = (quotationId) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      setQuotations(prev => prev.filter(q => q.id !== quotationId));
    }
  };

  const handleDuplicateQuotation = (quotation) => {
    const duplicatedQuotation = {
      ...quotation,
      id: `QT-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setQuotations(prev => [...prev, duplicatedQuotation]);
    alert('Quotation duplicated successfully!');
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingQuotation(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <QuotationForm
          quotation={editingQuotation}
          onSave={handleSaveQuotation}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quotations</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your quotations and track their status
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            New Quotation
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
              placeholder="Search quotations..."
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
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-max"
                 style={{ minWidth: '1200px' }}>
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quotation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
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
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {quotation.id}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {quotation.items} items
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{quotation.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {quotation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {quotation.validUntil}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{quotation.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[quotation.status]}`}>
                      {quotation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditQuotation(quotation)}
                        title="View/Edit"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        <span className="text-lg">👁️</span>
                      </button>
                      <button 
                        onClick={() => handleEditQuotation(quotation)}
                        title="Edit"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        <span className="text-lg">✏️</span>
                      </button>
                      <button 
                        onClick={() => handleDuplicateQuotation(quotation)}
                        title="Duplicate"
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      >
                        <span className="text-lg">📋</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteQuotation(quotation.id)}
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
      {filteredQuotations.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">📄</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No quotations found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new quotation for your customers.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                New Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}