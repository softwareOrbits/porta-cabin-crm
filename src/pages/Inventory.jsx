import { useState } from 'react';

const initialInventory = [
  {
    id: 'ITM-001',
    name: 'Steel Frame - 6m x 3m',
    category: 'Structural',
    sku: 'SF-6X3-001',
    quantity: 15,
    unit: 'pcs',
    unitPrice: 15000,
    reorderLevel: 5,
    supplier: 'Steel Works Ltd.',
    location: 'Warehouse A - Section 1',
    lastUpdated: '2024-01-15',
    status: 'in_stock'
  },
  {
    id: 'ITM-002',
    name: 'Insulation Material',
    category: 'Insulation',
    sku: 'INS-FOAM-002',
    quantity: 2,
    unit: 'rolls',
    unitPrice: 2500,
    reorderLevel: 10,
    supplier: 'Insulation Pro',
    location: 'Warehouse B - Section 2',
    lastUpdated: '2024-01-20',
    status: 'low_stock'
  },
  {
    id: 'ITM-003',
    name: 'Electrical Wiring Kit',
    category: 'Electrical',
    sku: 'EWK-STD-003',
    quantity: 25,
    unit: 'sets',
    unitPrice: 5000,
    reorderLevel: 8,
    supplier: 'Electric Solutions',
    location: 'Warehouse A - Section 3',
    lastUpdated: '2024-01-18',
    status: 'in_stock'
  },
  {
    id: 'ITM-004',
    name: 'Window Frames - Standard',
    category: 'Windows & Doors',
    sku: 'WF-STD-004',
    quantity: 0,
    unit: 'pcs',
    unitPrice: 8000,
    reorderLevel: 5,
    supplier: 'Window Works',
    location: 'Warehouse B - Section 1',
    lastUpdated: '2024-01-22',
    status: 'out_of_stock'
  },
  {
    id: 'ITM-005',
    name: 'Roofing Sheets',
    category: 'Roofing',
    sku: 'RS-CORR-005',
    quantity: 45,
    unit: 'sheets',
    unitPrice: 1200,
    reorderLevel: 20,
    supplier: 'Roof Masters',
    location: 'Warehouse C - Outdoor',
    lastUpdated: '2024-01-25',
    status: 'in_stock'
  }
];

const categories = [
  'All Categories',
  'Structural',
  'Insulation',
  'Electrical',
  'Windows & Doors',
  'Roofing',
  'Plumbing',
  'Hardware'
];

const statusColors = {
  in_stock: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  low_stock: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Structural',
    sku: '',
    quantity: 0,
    unit: 'pcs',
    unitPrice: 0,
    reorderLevel: 5,
    supplier: '',
    location: ''
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const calculateTotalValue = () => {
    return filteredInventory.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.quantity <= item.reorderLevel && item.quantity > 0).length;
  };

  const getOutOfStockItems = () => {
    return inventory.filter(item => item.quantity === 0).length;
  };

  const handleAddItem = () => {
    const itemData = {
      ...newItem,
      id: `ITM-${String(inventory.length + 1).padStart(3, '0')}`,
      status: newItem.quantity === 0 ? 'out_of_stock' : 
              newItem.quantity <= newItem.reorderLevel ? 'low_stock' : 'in_stock',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setInventory([...inventory, itemData]);
    setNewItem({
      name: '',
      category: 'Structural',
      sku: '',
      quantity: 0,
      unit: 'pcs',
      unitPrice: 0,
      reorderLevel: 5,
      supplier: '',
      location: ''
    });
    setShowAddModal(false);
    alert('Item added successfully!');
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedItem = {
          ...item,
          quantity: newQuantity,
          status: newQuantity === 0 ? 'out_of_stock' : 
                  newQuantity <= item.reorderLevel ? 'low_stock' : 'in_stock',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        return updatedItem;
      }
      return item;
    }));
  };

  const handleDeleteItem = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== itemId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your inventory and track stock levels
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            Add Item
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">📦</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Items</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{inventory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Value</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{calculateTotalValue().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Low Stock</h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{getLowStockItems()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">❌</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Out of Stock</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{getOutOfStockItems()}</p>
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
              placeholder="Search items..."
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
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Value
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
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        SKU: {item.sku}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        📍 {item.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{item.category}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Supplier: {item.supplier}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                        className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Reorder at: {item.reorderLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">₹{item.unitPrice.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ₹{(item.quantity * item.unitPrice).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Item</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
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
                      SKU
                    </label>
                    <input
                      type="text"
                      value={newItem.sku}
                      onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                      min="0"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unit
                    </label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="m">Meters</option>
                      <option value="m²">Square Meters</option>
                      <option value="sets">Sets</option>
                      <option value="rolls">Rolls</option>
                      <option value="sheets">Sheets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      value={newItem.unitPrice}
                      onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
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
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredInventory.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">📦</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No items found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding items to your inventory.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}