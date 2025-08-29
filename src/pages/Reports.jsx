import { useState } from 'react';

const reportTypes = [
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'View sales performance and revenue analysis',
    icon: '📊',
    category: 'Sales'
  },
  {
    id: 'projects',
    title: 'Project Report',
    description: 'Track project progress and completion status',
    icon: '🏗️',
    category: 'Operations'
  },
  {
    id: 'inventory',
    title: 'Inventory Report',
    description: 'Monitor stock levels and inventory valuation',
    icon: '📦',
    category: 'Inventory'
  },
  {
    id: 'contractors',
    title: 'Contractor Report',
    description: 'Analyze contractor performance and payments',
    icon: '👷',
    category: 'Contractors'
  },
  {
    id: 'financial',
    title: 'Financial Report',
    description: 'View profit & loss, cash flow analysis',
    icon: '💰',
    category: 'Financial'
  },
  {
    id: 'invoice',
    title: 'Invoice Report',
    description: 'Track invoice status and payment collection',
    icon: '🧾',
    category: 'Financial'
  }
];

const sampleData = {
  sales: {
    totalRevenue: 1250000,
    totalOrders: 25,
    averageOrderValue: 50000,
    monthlyGrowth: 15.2,
    data: [
      { month: 'Jan', revenue: 120000, orders: 3 },
      { month: 'Feb', revenue: 180000, orders: 4 },
      { month: 'Mar', revenue: 250000, orders: 5 },
      { month: 'Apr', revenue: 200000, orders: 4 },
      { month: 'May', revenue: 300000, orders: 6 },
      { month: 'Jun', revenue: 200000, orders: 3 }
    ]
  },
  projects: {
    totalProjects: 15,
    activeProjects: 8,
    completedProjects: 6,
    onHoldProjects: 1,
    completionRate: 85,
    data: [
      { name: 'ABC Industries Project', status: 'completed', progress: 100, value: 125000 },
      { name: 'XYZ Corporation Project', status: 'in_progress', progress: 75, value: 250000 },
      { name: 'Tech Solutions Project', status: 'open', progress: 25, value: 75000 }
    ]
  },
  inventory: {
    totalItems: 125,
    totalValue: 2850000,
    lowStockItems: 8,
    outOfStockItems: 3,
    categories: [
      { name: 'Structural', value: 1200000, items: 45 },
      { name: 'Electrical', value: 650000, items: 35 },
      { name: 'Plumbing', value: 450000, items: 25 },
      { name: 'Hardware', value: 350000, items: 20 }
    ]
  },
  contractors: {
    totalContractors: 12,
    activeContracts: 8,
    totalContractValue: 485000,
    pendingPayments: 145000,
    topContractors: [
      { name: 'Steel Structure Solutions', contracts: 5, value: 185000, rating: 5.0 },
      { name: 'Advanced Electrical Works', contracts: 3, value: 125000, rating: 4.5 },
      { name: 'Pro Painters & Finishers', contracts: 4, value: 95000, rating: 4.2 }
    ]
  }
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('last_30_days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Sales', 'Operations', 'Inventory', 'Contractors', 'Financial'];

  const filteredReports = reportTypes.filter(report => 
    selectedCategory === 'all' || report.category === selectedCategory
  );

  const renderReportContent = () => {
    if (!selectedReport) return null;

    const data = sampleData[selectedReport.id];

    switch (selectedReport.id) {
      case 'sales':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Revenue</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">₹{data.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Total Orders</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{data.totalOrders}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Order Value</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{data.averageOrderValue.toLocaleString()}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600 dark:text-orange-400">Monthly Growth</h3>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{data.monthlyGrowth}%</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Sales Trend</h3>
              <div className="space-y-2">
                {data.data.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 dark:text-green-400">₹{item.revenue.toLocaleString()}</span>
                      <span className="text-blue-600 dark:text-blue-400">{item.orders} orders</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Projects</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.totalProjects}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Active Projects</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{data.activeProjects}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Completed</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{data.completedProjects}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Completion Rate</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{data.completionRate}%</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Status</h3>
              <div className="space-y-3">
                {data.data.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">₹{project.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        project.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Items</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.totalItems}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Total Value</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹{data.totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Low Stock</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{data.lowStockItems}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Out of Stock</h3>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{data.outOfStockItems}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Inventory by Category</h3>
              <div className="space-y-3">
                {data.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({category.items} items)</span>
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">₹{category.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contractors':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Contractors</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.totalContractors}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Active Contracts</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{data.activeContracts}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Contract Value</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">₹{data.totalContractValue.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Pending Payments</h3>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">₹{data.pendingPayments.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Contractors</h3>
              <div className="space-y-3">
                {data.topContractors.map((contractor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{contractor.name}</span>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {contractor.contracts} contracts • Rating: {contractor.rating}/5.0
                      </div>
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">₹{contractor.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📊</span>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Report Coming Soon</h3>
            <p className="text-gray-500 dark:text-gray-400">This report is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View comprehensive business reports and analytics
          </p>
        </div>
        {selectedReport && (
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => setSelectedReport(null)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-2">←</span>
              Back to Reports
            </button>
          </div>
        )}
      </div>

      {!selectedReport ? (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_90_days">Last 90 Days</option>
                  <option value="this_year">This Year</option>
                  <option value="last_year">Last Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div 
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{report.icon}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{report.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {report.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{report.description}</p>
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <span>View Report</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <span className="mr-3 text-2xl">{selectedReport.icon}</span>
              {selectedReport.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">{selectedReport.description}</p>
          </div>
          {renderReportContent()}
        </div>
      )}
    </div>
  );
}