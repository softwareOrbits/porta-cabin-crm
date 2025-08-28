import { useState } from 'react';
import WorkOrderForm from '../components/WorkOrders/WorkOrderForm';

const initialWorkOrders = [
  {
    id: 'WO-2024-001',
    title: 'Electrical Installation - ABC Factory',
    salesOrderId: 'SO-2024-001',
    projectId: 'PRJ-2024-001',
    assignedTo: 'John Smith',
    priority: 'high',
    status: 'in_progress',
    startDate: '2024-01-20',
    expectedCompletionDate: '2024-02-10',
    actualCompletionDate: '',
    description: 'Complete electrical wiring and panel installation for the porta cabin',
    materialRequirements: [
      { id: 1, description: 'Electrical cables', quantity: 100, unit: 'm', estimatedCost: 50 },
      { id: 2, description: 'Distribution panel', quantity: 1, unit: 'pcs', estimatedCost: 2500 }
    ],
    laborAssignments: [
      { id: 1, worker: 'John Smith', role: 'Electrician', hoursAllocated: 40, hourlyRate: 500 },
      { id: 2, worker: 'Mike Johnson', role: 'Assistant', hoursAllocated: 40, hourlyRate: 300 }
    ],
    totalMaterialCost: 7500,
    totalLaborCost: 32000,
    totalEstimatedCost: 39500,
    drawings: [
      { id: 1, name: 'electrical-layout.pdf', size: 2048 }
    ],
    createdAt: '2024-01-20T09:00:00Z'
  },
  {
    id: 'WO-2024-002',
    title: 'Structural Assembly - XYZ Office',
    salesOrderId: 'SO-2024-002',
    projectId: 'PRJ-2024-002',
    assignedTo: 'Sarah Williams',
    priority: 'medium',
    status: 'completed',
    startDate: '2024-01-15',
    expectedCompletionDate: '2024-02-15',
    actualCompletionDate: '2024-02-10',
    description: 'Assembly of structural components for office complex',
    materialRequirements: [
      { id: 3, description: 'Steel frames', quantity: 20, unit: 'pcs', estimatedCost: 1500 },
      { id: 4, description: 'Bolts and fasteners', quantity: 100, unit: 'sets', estimatedCost: 25 }
    ],
    laborAssignments: [
      { id: 3, worker: 'Sarah Williams', role: 'Structural Engineer', hoursAllocated: 60, hourlyRate: 800 },
      { id: 4, worker: 'David Brown', role: 'Welder', hoursAllocated: 50, hourlyRate: 400 }
    ],
    totalMaterialCost: 32500,
    totalLaborCost: 68000,
    totalEstimatedCost: 100500,
    drawings: [
      { id: 2, name: 'structural-design.dwg', size: 4096 }
    ],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'WO-2024-003',
    title: 'Interior Finishing - Tech Park',
    salesOrderId: 'SO-2024-003',
    projectId: 'PRJ-2024-003',
    assignedTo: 'Lisa Davis',
    priority: 'low',
    status: 'pending',
    startDate: '2024-02-01',
    expectedCompletionDate: '2024-03-01',
    actualCompletionDate: '',
    description: 'Interior finishing work including flooring, painting, and fixtures',
    materialRequirements: [
      { id: 5, description: 'Flooring tiles', quantity: 50, unit: 'm²', estimatedCost: 200 },
      { id: 6, description: 'Paint', quantity: 20, unit: 'kg', estimatedCost: 150 }
    ],
    laborAssignments: [
      { id: 5, worker: 'Lisa Davis', role: 'Interior Designer', hoursAllocated: 30, hourlyRate: 600 },
      { id: 6, worker: 'Robert Wilson', role: 'Painter', hoursAllocated: 40, hourlyRate: 350 }
    ],
    totalMaterialCost: 13000,
    totalLaborCost: 32000,
    totalEstimatedCost: 45000,
    drawings: [],
    createdAt: '2024-01-25T14:15:00Z'
  }
];

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  on_hold: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function WorkOrders() {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState(null);

  const filteredWorkOrders = workOrders.filter(workOrder => {
    const matchesSearch = workOrder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workOrder.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workOrder.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workOrder.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || workOrder.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSaveWorkOrder = (workOrderData, action) => {
    if (editingWorkOrder) {
      // Update existing work order
      setWorkOrders(prev => prev.map(wo => 
        wo.id === editingWorkOrder.id ? workOrderData : wo
      ));
    } else {
      // Add new work order
      setWorkOrders(prev => [...prev, workOrderData]);
    }
    
    setShowForm(false);
    setEditingWorkOrder(null);
    
    alert('Work Order saved successfully!');
  };

  const handleEditWorkOrder = (workOrder) => {
    setEditingWorkOrder(workOrder);
    setShowForm(true);
  };

  const handleDeleteWorkOrder = (workOrderId) => {
    if (confirm('Are you sure you want to delete this work order?')) {
      setWorkOrders(prev => prev.filter(wo => wo.id !== workOrderId));
    }
  };

  const handleMarkComplete = (workOrder) => {
    if (confirm('Mark this work order as complete?')) {
      const updatedWorkOrder = {
        ...workOrder,
        status: 'completed',
        actualCompletionDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      };
      setWorkOrders(prev => prev.map(wo => 
        wo.id === workOrder.id ? updatedWorkOrder : wo
      ));
      alert('Work order marked as completed!');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingWorkOrder(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <WorkOrderForm
          workOrder={editingWorkOrder}
          onSave={handleSaveWorkOrder}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Orders</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage work orders linked to projects and sales orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            New Work Order
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
              placeholder="Search work orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Work Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkOrders.map((workOrder) => (
          <div key={workOrder.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {/* Work Order Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {workOrder.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{workOrder.id}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[workOrder.status]}`}>
                  {workOrder.status.replace('_', ' ')}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[workOrder.priority]}`}>
                  {workOrder.priority}
                </span>
              </div>
            </div>

            {/* Work Order Details */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Project ID</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{workOrder.projectId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Assigned To</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{workOrder.assignedTo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{workOrder.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expected Completion</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {workOrder.expectedCompletionDate || 'Not set'}
                  </p>
                </div>
              </div>

              {workOrder.description && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                  <p className="text-sm text-gray-900 dark:text-white">{workOrder.description}</p>
                </div>
              )}
            </div>

            {/* Cost Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Cost Breakdown</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Material</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{workOrder.totalMaterialCost?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Labor</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₹{workOrder.totalLaborCost?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">₹{workOrder.totalEstimatedCost?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Requirements Summary */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <span>📦 {workOrder.materialRequirements?.length || 0} materials</span>
                <span>👷 {workOrder.laborAssignments?.length || 0} workers</span>
                {workOrder.drawings?.length > 0 && (
                  <span>📋 {workOrder.drawings.length} drawing(s)</span>
                )}
              </div>
            </div>

            {/* Completion Status */}
            {workOrder.actualCompletionDate && (
              <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="flex items-center">
                  <span className="text-green-400 text-lg mr-2">✅</span>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Completed on {workOrder.actualCompletionDate}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditWorkOrder(workOrder)}
                  title="View/Edit"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                >
                  <span className="text-lg">👁️</span>
                </button>
                <button 
                  onClick={() => handleEditWorkOrder(workOrder)}
                  title="Edit"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <span className="text-lg">✏️</span>
                </button>
                <button 
                  onClick={() => handleDeleteWorkOrder(workOrder.id)}
                  title="Delete"
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                >
                  <span className="text-lg">🗑️</span>
                </button>
              </div>

              {workOrder.status !== 'completed' && workOrder.status !== 'cancelled' && (
                <button 
                  onClick={() => handleMarkComplete(workOrder)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="mr-1">✅</span>
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWorkOrders.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">🔧</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No work orders found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new work order for your projects.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                New Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}