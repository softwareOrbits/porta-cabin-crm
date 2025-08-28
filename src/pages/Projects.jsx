import { useState } from 'react';
import ProjectForm from '../components/Projects/ProjectForm';

const initialProjects = [
  {
    id: 'PRJ-2024-001',
    name: 'ABC Industries Ltd. - PO-ABC-2024-001',
    customer: 'ABC Industries Ltd.',
    salesOrderId: 'SO-2024-001',
    poNumber: 'PO-ABC-2024-001',
    deliveryLocation: 'Factory Complex, Industrial Area',
    startDate: '2024-01-15',
    expectedEndDate: '2024-03-15',
    actualEndDate: '',
    status: 'in_progress',
    description: 'Custom porta cabin installation for factory premises',
    deliveryNoteSigned: false,
    deliveryNoteDate: '',
    signedBy: '',
    drawings: [
      { id: 1, name: 'electrical-layout.pdf', size: 2048 },
      { id: 2, name: 'structural-design.dwg', size: 4096 }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'PRJ-2024-002',
    name: 'XYZ Corporation - Office Complex',
    customer: 'XYZ Corporation',
    salesOrderId: 'SO-2024-002',
    poNumber: 'PO-XYZ-2024-002',
    deliveryLocation: 'Construction Site, Downtown',
    startDate: '2024-01-14',
    expectedEndDate: '2024-04-14',
    actualEndDate: '2024-02-28',
    status: 'completed',
    description: 'Multi-unit office complex with modern amenities',
    deliveryNoteSigned: true,
    deliveryNoteDate: '2024-02-28',
    signedBy: 'John Smith - Project Manager',
    drawings: [
      { id: 3, name: 'floor-plan.pdf', size: 1536 },
      { id: 4, name: 'electrical-diagram.pdf', size: 2048 }
    ],
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 'PRJ-2024-003',
    name: 'Tech Solutions Pvt Ltd - PO-TECH-2024-001',
    customer: 'Tech Solutions Pvt Ltd',
    salesOrderId: 'SO-2024-003',
    poNumber: 'PO-TECH-2024-001',
    deliveryLocation: 'Office Building, Tech Park',
    startDate: '2024-01-13',
    expectedEndDate: '2024-05-13',
    actualEndDate: '',
    status: 'open',
    description: 'Modern office pods for tech company',
    deliveryNoteSigned: false,
    deliveryNoteDate: '',
    signedBy: '',
    drawings: [],
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const statusColors = {
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  on_hold: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
};

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.poNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveProject = (projectData, action) => {
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id ? projectData : p
      ));
    } else {
      // Add new project
      setProjects(prev => [...prev, projectData]);
    }
    
    setShowForm(false);
    setEditingProject(null);
    
    alert('Project saved successfully!');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const handleSignDeliveryNote = (project) => {
    if (confirm('Sign delivery note for this project? This will mark the project as completed and prevent further modifications.')) {
      const updatedProject = {
        ...project,
        deliveryNoteSigned: true,
        deliveryNoteDate: new Date().toISOString().split('T')[0],
        actualEndDate: new Date().toISOString().split('T')[0],
        status: 'completed',
        updatedAt: new Date().toISOString()
      };
      setProjects(prev => prev.map(p => 
        p.id === project.id ? updatedProject : p
      ));
      alert('Delivery note signed! Project marked as completed.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const getProjectProgress = (project) => {
    if (project.status === 'completed') return 100;
    if (project.status === 'cancelled') return 0;
    if (project.status === 'on_hold') return 50;
    
    // Calculate progress based on dates
    if (project.expectedEndDate) {
      const start = new Date(project.startDate);
      const expected = new Date(project.expectedEndDate);
      const now = new Date();
      
      const totalDays = Math.ceil((expected - start) / (1000 * 60 * 60 * 24));
      const elapsedDays = Math.ceil((now - start) / (1000 * 60 * 60 * 24));
      
      const progress = Math.min(Math.max((elapsedDays / totalDays) * 100, 0), 100);
      return Math.round(progress);
    }
    
    return project.status === 'in_progress' ? 30 : 10;
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track project progress and manage delivery notes
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">➕</span>
            New Project
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
              placeholder="Search projects..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const progress = getProjectProgress(project);
          return (
            <div key={project.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.id}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[project.status]}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              {/* Project Details */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{project.customer}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">PO Number</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{project.poNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Location</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{project.deliveryLocation}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expected End</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.expectedEndDate || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Drawings Count */}
              {project.drawings && project.drawings.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-1">📋</span>
                    {project.drawings.length} drawing(s) uploaded
                  </div>
                </div>
              )}

              {/* Delivery Note Status */}
              {project.deliveryNoteSigned && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center">
                    <span className="text-green-400 text-lg mr-2">✅</span>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Delivery Note Signed
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        By: {project.signedBy} on {project.deliveryNoteDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between space-x-2">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditProject(project)}
                    title="View/Edit"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    <span className="text-lg">👁️</span>
                  </button>
                  <button 
                    onClick={() => handleEditProject(project)}
                    title="Edit"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    <span className="text-lg">✏️</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    title="Delete"
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <span className="text-lg">🗑️</span>
                  </button>
                </div>

                {!project.deliveryNoteSigned && project.status !== 'cancelled' && (
                  <button 
                    onClick={() => handleSignDeliveryNote(project)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="mr-1">✍️</span>
                    Sign Delivery Note
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <span className="text-5xl">🏗️</span>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new project or completing a sales order.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">➕</span>
                New Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}