import { useState } from 'react';

const initialAssets = [
  {
    id: 'AST-001',
    name: 'Welding Machine - Industrial Grade',
    category: 'Equipment',
    barcode: 'WM-2024-001',
    purchaseDate: '2024-01-15',
    purchasePrice: 85000,
    currentValue: 76500,
    depreciationMethod: 'linear',
    depreciationRate: 10,
    usefulLife: 10,
    location: 'Workshop A',
    condition: 'excellent',
    status: 'active'
  },
  {
    id: 'AST-002',
    name: 'Toyota Hiace Van',
    category: 'Vehicle',
    barcode: 'VH-2024-001',
    purchaseDate: '2023-06-20',
    purchasePrice: 1250000,
    currentValue: 1000000,
    depreciationMethod: 'exponential',
    depreciationRate: 20,
    usefulLife: 8,
    location: 'Main Office',
    condition: 'good',
    status: 'active'
  },
  {
    id: 'AST-003',
    name: 'Desktop Computer Set',
    category: 'IT Equipment',
    barcode: 'IT-2024-003',
    purchaseDate: '2024-02-10',
    purchasePrice: 45000,
    currentValue: 40500,
    depreciationMethod: 'exponential',
    depreciationRate: 25,
    usefulLife: 4,
    location: 'Office',
    condition: 'excellent',
    status: 'active'
  },
  {
    id: 'AST-004',
    name: 'Office Furniture Set',
    category: 'Furniture',
    barcode: 'FU-2024-004',
    purchaseDate: '2024-01-05',
    purchasePrice: 25000,
    currentValue: 23750,
    depreciationMethod: 'linear',
    depreciationRate: 5,
    usefulLife: 15,
    location: 'Main Office',
    condition: 'good',
    status: 'active'
  }
];

const categories = [
  'All Categories',
  'Equipment',
  'Vehicle',
  'IT Equipment',
  'Furniture',
  'Tools',
  'Machinery'
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  retired: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

const conditionColors = {
  excellent: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  good: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  fair: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  poor: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function Assets() {
  const [assets, setAssets] = useState(initialAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAsset, setNewAsset] = useState({
    name: '',
    category: 'Equipment',
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    depreciationMethod: 'linear',
    depreciationRate: 10,
    usefulLife: 5,
    location: '',
    condition: 'excellent'
  });

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const calculateTotalStats = () => {
    const totalAssets = assets.length;
    const totalValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);
    const currentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalDepreciation = totalValue - currentValue;
    
    return { totalAssets, totalValue, currentValue, totalDepreciation };
  };

  const generateBarcode = () => {
    const prefix = newAsset.category.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${random}`;
  };

  const calculateDepreciation = (asset) => {
    const purchaseDate = new Date(asset.purchaseDate);
    const currentDate = new Date();
    const yearsUsed = (currentDate - purchaseDate) / (365.25 * 24 * 60 * 60 * 1000);
    
    let depreciation = 0;
    if (asset.depreciationMethod === 'linear') {
      depreciation = (asset.purchasePrice * asset.depreciationRate / 100) * yearsUsed;
    } else if (asset.depreciationMethod === 'exponential') {
      depreciation = asset.purchasePrice * (1 - Math.pow(1 - asset.depreciationRate / 100, yearsUsed));
    }
    
    const currentValue = Math.max(0, asset.purchasePrice - depreciation);
    return { depreciation, currentValue };
  };

  const handleAddAsset = () => {
    const assetData = {
      ...newAsset,
      id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
      barcode: generateBarcode(),
      currentValue: newAsset.purchasePrice, // Initially same as purchase price
      status: 'active'
    };

    setAssets([...assets, assetData]);
    setNewAsset({
      name: '',
      category: 'Equipment',
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      depreciationMethod: 'linear',
      depreciationRate: 10,
      usefulLife: 5,
      location: '',
      condition: 'excellent'
    });
    setShowAddModal(false);
    alert('Asset added successfully!');
  };

  const { totalAssets, totalValue, currentValue, totalDepreciation } = calculateTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Asset Management</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track assets, depreciation, and barcode management
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            Add Asset
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">🏷️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Assets</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalAssets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Purchase Value</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Value</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${currentValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">📉</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Depreciation</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalDepreciation.toLocaleString()}</p>
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
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {/* Asset Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {asset.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{asset.id}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[asset.status]}`}>
                  {asset.status}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${conditionColors[asset.condition]}`}>
                  {asset.condition}
                </span>
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{asset.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Barcode</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">{asset.barcode}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">📍 {asset.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{asset.purchaseDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Depreciation</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{asset.depreciationMethod} ({asset.depreciationRate}%)</p>
                </div>
              </div>
            </div>

            {/* Value Information */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Asset Valuation</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Purchase Price</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">${asset.purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Value</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">${asset.currentValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Depreciated</p>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">${(asset.purchasePrice - asset.currentValue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Useful Life</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{asset.usefulLife} years</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex space-x-2">
                <button 
                  title="View/Edit"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                >
                  <span className="text-lg">👁️</span>
                </button>
                <button 
                  title="Print Barcode"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <span className="text-lg">🏷️</span>
                </button>
                <button 
                  title="Maintenance"
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                >
                  <span className="text-lg">🔧</span>
                </button>
              </div>

              <button 
                title="Depreciation Report"
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <span className="mr-1">📊</span>
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Asset</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newAsset.category}
                      onChange={(e) => setNewAsset({...newAsset, category: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Purchase Price
                    </label>
                    <input
                      type="number"
                      value={newAsset.purchasePrice}
                      onChange={(e) => setNewAsset({...newAsset, purchasePrice: parseFloat(e.target.value) || 0})}
                      min="0"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    value={newAsset.purchaseDate}
                    onChange={(e) => setNewAsset({...newAsset, purchaseDate: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Depreciation Method
                    </label>
                    <select
                      value={newAsset.depreciationMethod}
                      onChange={(e) => setNewAsset({...newAsset, depreciationMethod: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="linear">Linear</option>
                      <option value="exponential">Exponential</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Depreciation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={newAsset.depreciationRate}
                      onChange={(e) => setNewAsset({...newAsset, depreciationRate: parseFloat(e.target.value) || 0})}
                      min="0"
                      max="100"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newAsset.location}
                    onChange={(e) => setNewAsset({...newAsset, location: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAsset}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">🏷️</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No assets found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding assets to track and manage.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}