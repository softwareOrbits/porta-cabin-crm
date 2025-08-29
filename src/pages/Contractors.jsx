import { useState } from 'react';

const initialContractors = [
  {
    id: 'CTR-001',
    name: 'Advanced Electrical Works',
    contactPerson: 'Rajesh Kumar',
    mobile: '+91-9876543210',
    email: 'rajesh@advancedelectrical.com',
    specialization: 'Electrical Installation',
    status: 'active',
    projects: [
      {
        projectId: 'PRJ-2024-001',
        projectName: 'ABC Industries Ltd. - PO-ABC-2024-001',
        scopeOfWork: 'Complete electrical wiring and panel installation',
        startDate: '2024-01-20',
        endDate: '2024-02-10',
        contractValue: 35000,
        amountPaid: 15000,
        pendingAmount: 20000,
        status: 'in_progress'
      }
    ],
    totalContracts: 1,
    totalValue: 35000,
    pendingPayments: 20000,
    rating: 4.5,
    createdDate: '2024-01-15'
  },
  {
    id: 'CTR-002',
    name: 'Steel Structure Solutions',
    contactPerson: 'Amit Sharma',
    mobile: '+91-9765432108',
    email: 'amit@steelstructure.com',
    specialization: 'Structural Work',
    status: 'active',
    projects: [
      {
        projectId: 'PRJ-2024-002',
        projectName: 'XYZ Corporation - Office Complex',
        scopeOfWork: 'Structural assembly and welding work',
        startDate: '2024-01-15',
        endDate: '2024-02-10',
        contractValue: 85000,
        amountPaid: 85000,
        pendingAmount: 0,
        status: 'completed'
      }
    ],
    totalContracts: 1,
    totalValue: 85000,
    pendingPayments: 0,
    rating: 5.0,
    createdDate: '2024-01-10'
  },
  {
    id: 'CTR-003',
    name: 'Pro Painters & Finishers',
    contactPerson: 'Suresh Patel',
    mobile: '+91-9654321087',
    email: 'suresh@propainters.com',
    specialization: 'Painting & Finishing',
    status: 'active',
    projects: [
      {
        projectId: 'PRJ-2024-003',
        projectName: 'Tech Solutions Pvt Ltd - PO-TECH-2024-001',
        scopeOfWork: 'Interior painting and finishing work',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        contractValue: 25000,
        amountPaid: 0,
        pendingAmount: 25000,
        status: 'pending'
      }
    ],
    totalContracts: 1,
    totalValue: 25000,
    pendingPayments: 25000,
    rating: 4.2,
    createdDate: '2024-01-25'
  }
];

const availableProjects = [
  { id: 'PRJ-2024-001', name: 'ABC Industries Ltd. - PO-ABC-2024-001', status: 'in_progress' },
  { id: 'PRJ-2024-002', name: 'XYZ Corporation - Office Complex', status: 'completed' },
  { id: 'PRJ-2024-003', name: 'Tech Solutions Pvt Ltd - PO-TECH-2024-001', status: 'open' }
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  suspended: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

const projectStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function Contractors() {
  const [contractors, setContractors] = useState(initialContractors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [newContractor, setNewContractor] = useState({
    name: '',
    contactPerson: '',
    mobile: '',
    email: '',
    specialization: '',
    status: 'active'
  });

  const [newAssignment, setNewAssignment] = useState({
    projectId: '',
    scopeOfWork: '',
    contractValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const [paymentData, setPaymentData] = useState({
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contractor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contractor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateTotalStats = () => {
    const totalContractors = contractors.length;
    const totalValue = contractors.reduce((sum, contractor) => sum + contractor.totalValue, 0);
    const pendingPayments = contractors.reduce((sum, contractor) => sum + contractor.pendingPayments, 0);
    
    return { totalContractors, totalValue, pendingPayments };
  };

  const handleAddContractor = () => {
    const contractorData = {
      ...newContractor,
      id: `CTR-${String(contractors.length + 1).padStart(3, '0')}`,
      projects: [],
      totalContracts: 0,
      totalValue: 0,
      pendingPayments: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setContractors([...contractors, contractorData]);
    setNewContractor({
      name: '',
      contactPerson: '',
      mobile: '',
      email: '',
      specialization: '',
      status: 'active'
    });
    setShowAddModal(false);
    alert('Contractor added successfully!');
  };

  const handleAssignProject = () => {
    if (!selectedContractor || !newAssignment.projectId) return;

    const projectDetails = availableProjects.find(p => p.id === newAssignment.projectId);
    if (!projectDetails) return;

    const assignment = {
      ...newAssignment,
      projectName: projectDetails.name,
      amountPaid: 0,
      pendingAmount: newAssignment.contractValue,
      status: 'pending'
    };

    setContractors(prev => prev.map(contractor => {
      if (contractor.id === selectedContractor.id) {
        return {
          ...contractor,
          projects: [...contractor.projects, assignment],
          totalContracts: contractor.totalContracts + 1,
          totalValue: contractor.totalValue + newAssignment.contractValue,
          pendingPayments: contractor.pendingPayments + newAssignment.contractValue
        };
      }
      return contractor;
    }));

    setNewAssignment({
      projectId: '',
      scopeOfWork: '',
      contractValue: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    setShowAssignModal(false);
    setSelectedContractor(null);
    alert('Project assigned successfully!');
  };

  const handlePayment = () => {
    if (!selectedContractor || !selectedProject || paymentData.amount <= 0) return;

    setContractors(prev => prev.map(contractor => {
      if (contractor.id === selectedContractor.id) {
        const updatedProjects = contractor.projects.map(project => {
          if (project.projectId === selectedProject.projectId) {
            const newAmountPaid = project.amountPaid + paymentData.amount;
            const newPendingAmount = Math.max(0, project.pendingAmount - paymentData.amount);
            return {
              ...project,
              amountPaid: newAmountPaid,
              pendingAmount: newPendingAmount,
              status: newPendingAmount === 0 ? 'completed' : 'in_progress'
            };
          }
          return project;
        });

        const newPendingPayments = Math.max(0, contractor.pendingPayments - paymentData.amount);

        return {
          ...contractor,
          projects: updatedProjects,
          pendingPayments: newPendingPayments
        };
      }
      return contractor;
    }));

    setPaymentData({
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowPaymentModal(false);
    setSelectedContractor(null);
    setSelectedProject(null);
    alert('Payment recorded successfully!');
  };

  const { totalContractors, totalValue, pendingPayments } = calculateTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contractors</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage contractor assignments and payments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            Add Contractor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">👷</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Contractors</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalContractors}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Contracts</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">⏳</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pending Payments</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">${pendingPayments.toLocaleString()}</p>
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
              placeholder="Search contractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contractors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContractors.map((contractor) => (
          <div key={contractor.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {/* Contractor Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {contractor.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{contractor.id}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[contractor.status]}`}>
                {contractor.status}
              </span>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">👤</span>
                {contractor.contactPerson}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">📞</span>
                {contractor.mobile}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">✉️</span>
                {contractor.email}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">🔧</span>
                {contractor.specialization}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{contractor.totalContracts}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Value</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">${contractor.totalValue.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">${contractor.pendingPayments.toLocaleString()}</p>
              </div>
            </div>

            {/* Current Projects */}
            {contractor.projects.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Projects:</h4>
                {contractor.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-xs">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{project.projectName}</p>
                        <p className="text-gray-500 dark:text-gray-400">{project.scopeOfWork}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${projectStatusColors[project.status]}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Contract: ${project.contractValue.toLocaleString()}</span>
                      <span className="text-red-600 dark:text-red-400">Pending: ${project.pendingAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedContractor(contractor);
                    setShowAssignModal(true);
                  }}
                  title="Assign Project"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                >
                  <span className="text-lg">📋</span>
                </button>
                {contractor.pendingPayments > 0 && (
                  <button 
                    onClick={() => {
                      setSelectedContractor(contractor);
                      setSelectedProject(contractor.projects.find(p => p.pendingAmount > 0));
                      setShowPaymentModal(true);
                    }}
                    title="Record Payment"
                    className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                  >
                    <span className="text-lg">💰</span>
                  </button>
                )}
              </div>

              {contractor.rating > 0 && (
                <div className="flex items-center text-yellow-500">
                  <span className="mr-1">⭐</span>
                  <span className="text-sm font-medium">{contractor.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Contractor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Contractor</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newContractor.name}
                    onChange={(e) => setNewContractor({...newContractor, name: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={newContractor.contactPerson}
                    onChange={(e) => setNewContractor({...newContractor, contactPerson: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    value={newContractor.mobile}
                    onChange={(e) => setNewContractor({...newContractor, mobile: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newContractor.email}
                    onChange={(e) => setNewContractor({...newContractor, email: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={newContractor.specialization}
                    onChange={(e) => setNewContractor({...newContractor, specialization: e.target.value})}
                    placeholder="e.g., Electrical Work, Plumbing, Painting"
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
                  onClick={handleAddContractor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Contractor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Project Modal */}
      {showAssignModal && selectedContractor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Assign Project to {selectedContractor.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project
                  </label>
                  <select
                    value={newAssignment.projectId}
                    onChange={(e) => setNewAssignment({...newAssignment, projectId: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a project</option>
                    {availableProjects.filter(p => p.status === 'open' || p.status === 'in_progress').map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Scope of Work
                  </label>
                  <textarea
                    value={newAssignment.scopeOfWork}
                    onChange={(e) => setNewAssignment({...newAssignment, scopeOfWork: e.target.value})}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contract Value
                  </label>
                  <input
                    type="number"
                    value={newAssignment.contractValue}
                    onChange={(e) => setNewAssignment({...newAssignment, contractValue: parseFloat(e.target.value) || 0})}
                    min="0"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newAssignment.startDate}
                      onChange={(e) => setNewAssignment({...newAssignment, startDate: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newAssignment.endDate}
                      onChange={(e) => setNewAssignment({...newAssignment, endDate: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedContractor(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Assign Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedContractor && selectedProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Record Payment for {selectedContractor.name}
              </h3>
              
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">Project: {selectedProject.projectName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending: ${selectedProject.pendingAmount.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})}
                    max={selectedProject.pendingAmount}
                    min="0"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={paymentData.paymentDate}
                    onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedContractor(null);
                    setSelectedProject(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredContractors.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">👷</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No contractors found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding contractors to your system.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                Add Contractor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}