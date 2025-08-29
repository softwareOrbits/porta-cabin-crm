import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const auditTypes = [
  'All Actions',
  'User Login/Logout', 
  'Data Creation',
  'Data Updates',
  'Data Deletion',
  'Approvals',
  'System Changes',
  'Security Events'
];

const actionIcons = {
  'login': '🔐',
  'logout': '🚪',
  'create': '➕',
  'update': '✏️',
  'delete': '🗑️',
  'approve': '✅',
  'reject': '❌',
  'system': '⚙️',
  'security': '🛡️',
  'view': '👁️',
  'export': '📊'
};

const actionColors = {
  'login': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'logout': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
  'create': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'update': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'delete': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  'approve': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'reject': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  'system': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'security': 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  'view': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300',
  'export': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'
};

// Sample audit trail data
const initialAuditLogs = [
  {
    id: 'AUD-001',
    timestamp: '2024-01-30T10:30:00Z',
    userId: 'admin@portacabin.com',
    userName: 'Admin User',
    action: 'create',
    module: 'Employees',
    entity: 'Employee Record',
    entityId: 'EMP-001',
    description: 'Created new employee record for Ahmed Hassan',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      before: null,
      after: {
        name: 'Ahmed Hassan',
        position: 'Site Supervisor',
        department: 'Operations'
      }
    },
    severity: 'info'
  },
  {
    id: 'AUD-002',
    timestamp: '2024-01-30T10:25:00Z',
    userId: 'john@portacabin.com',
    userName: 'John Manager',
    action: 'update',
    module: 'Sales Orders',
    entity: 'Sales Order',
    entityId: 'SO-2024-001',
    description: 'Updated sales order status from Draft to Confirmed',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      before: { status: 'draft' },
      after: { status: 'confirmed' }
    },
    severity: 'info'
  },
  {
    id: 'AUD-003',
    timestamp: '2024-01-30T10:15:00Z',
    userId: 'admin@portacabin.com',
    userName: 'Admin User',
    action: 'login',
    module: 'Authentication',
    entity: 'User Session',
    entityId: 'SESSION-001',
    description: 'User logged into the system',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: null,
    severity: 'info'
  },
  {
    id: 'AUD-004',
    timestamp: '2024-01-30T09:45:00Z',
    userId: 'sarah@portacabin.com',
    userName: 'Sarah Customer Service',
    action: 'approve',
    module: 'Quotations',
    entity: 'Quotation',
    entityId: 'QUO-2024-015',
    description: 'Approved quotation for ABC Industries',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      before: { status: 'pending_approval' },
      after: { status: 'approved', approvedBy: 'Sarah Customer Service' }
    },
    severity: 'info'
  },
  {
    id: 'AUD-005',
    timestamp: '2024-01-30T09:30:00Z',
    userId: 'system',
    userName: 'System',
    action: 'system',
    module: 'Inventory',
    entity: 'Stock Level',
    entityId: 'ITM-002',
    description: 'Automated low stock alert triggered for Insulation Material',
    ipAddress: 'system',
    userAgent: 'System Process',
    changes: {
      before: { quantity: 10, alert_sent: false },
      after: { quantity: 2, alert_sent: true }
    },
    severity: 'warning'
  },
  {
    id: 'AUD-006',
    timestamp: '2024-01-30T09:00:00Z',
    userId: 'john@portacabin.com',
    userName: 'John Manager',
    action: 'delete',
    module: 'Projects',
    entity: 'Project Document',
    entityId: 'DOC-001',
    description: 'Deleted outdated project drawing',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      before: { fileName: 'old_drawing_v1.pdf', size: '2.5MB' },
      after: null
    },
    severity: 'warning'
  },
  {
    id: 'AUD-007',
    timestamp: '2024-01-30T08:45:00Z',
    userId: 'unauthorized',
    userName: 'Unknown User',
    action: 'security',
    module: 'Authentication',
    entity: 'Login Attempt',
    entityId: 'FAILED-001',
    description: 'Failed login attempt with invalid credentials',
    ipAddress: '203.145.67.89',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: null,
    severity: 'error'
  }
];

export default function AuditTrail() {
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [filteredLogs, setFilteredLogs] = useState(initialAuditLogs);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    actionType: 'All Actions',
    dateFrom: '',
    dateTo: '',
    userId: '',
    module: '',
    severity: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const modules = ['All Modules', 'Authentication', 'Employees', 'Sales Orders', 'Quotations', 'Projects', 'Inventory', 'Invoices'];
  const severityLevels = ['all', 'info', 'warning', 'error'];

  // Add audit log function
  const addAuditLog = (action, module, entity, entityId, description, changes = null, severity = 'info') => {
    const newLog = {
      id: `AUD-${String(auditLogs.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      userId: user?.email || 'system',
      userName: user?.name || 'System',
      action,
      module,
      entity,
      entityId,
      description,
      ipAddress: '192.168.1.100', // In real app, get actual IP
      userAgent: navigator.userAgent,
      changes,
      severity
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Filter logs based on criteria
  useEffect(() => {
    let filtered = auditLogs;

    // Filter by action type
    if (filters.actionType !== 'All Actions') {
      const actionMap = {
        'User Login/Logout': ['login', 'logout'],
        'Data Creation': ['create'],
        'Data Updates': ['update'],
        'Data Deletion': ['delete'],
        'Approvals': ['approve', 'reject'],
        'System Changes': ['system'],
        'Security Events': ['security']
      };
      
      if (actionMap[filters.actionType]) {
        filtered = filtered.filter(log => actionMap[filters.actionType].includes(log.action));
      }
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(filters.dateTo + 'T23:59:59'));
    }

    // Filter by user
    if (filters.userId) {
      filtered = filtered.filter(log => 
        log.userId.toLowerCase().includes(filters.userId.toLowerCase()) ||
        log.userName.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }

    // Filter by module
    if (filters.module && filters.module !== 'All Modules') {
      filtered = filtered.filter(log => log.module === filters.module);
    }

    // Filter by severity
    if (filters.severity !== 'all') {
      filtered = filtered.filter(log => log.severity === filters.severity);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [auditLogs, filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const exportAuditLogs = () => {
    // Add audit log for export action
    addAuditLog('export', 'Audit Trail', 'Audit Logs', 'EXPORT-001', 'Exported audit trail data', null, 'info');
    
    // Create CSV content
    const headers = ['Timestamp', 'User', 'Action', 'Module', 'Entity', 'Description'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        formatTimestamp(log.timestamp),
        log.userName,
        log.action,
        log.module,
        log.entity,
        `"${log.description}"`
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_trail_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewLogDetails = (log) => {
    setSelectedLog(log);
    setShowDetails(true);
    // Add audit log for viewing details
    addAuditLog('view', 'Audit Trail', 'Audit Log', log.id, `Viewed audit log details: ${log.id}`, null, 'info');
  };

  const getSeverityColor = (severity) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
    };
    return colors[severity] || colors.info;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Trail</h2>
          <p className="text-gray-600 dark:text-gray-400">Track all system activities and changes</p>
        </div>
        <button
          onClick={exportAuditLogs}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <span>📊</span>
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Action Type
            </label>
            <select
              value={filters.actionType}
              onChange={(e) => handleFilterChange('actionType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {auditTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Module
            </label>
            <select
              value={filters.module}
              onChange={(e) => handleFilterChange('module', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Severity
            </label>
            <select
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredLogs.length} of {auditLogs.length} audit logs
          </p>
          <button
            onClick={() => {
              setFilters({
                actionType: 'All Actions',
                dateFrom: '',
                dateTo: '',
                userId: '',
                module: '',
                severity: 'all'
              });
              setSearchTerm('');
            }}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{log.userName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{log.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action]}`}>
                      <span className="mr-1">{actionIcons[log.action]}</span>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {log.module}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                    {log.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewLogDetails(log)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      👁️ View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Details Modal */}
      {showDetails && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Audit Log Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Log ID:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Timestamp:</span>
                      <span className="text-gray-900 dark:text-white">{formatTimestamp(selectedLog.timestamp)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">User:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">User ID:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.userId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Action:</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${actionColors[selectedLog.action]}`}>
                        <span className="mr-1">{actionIcons[selectedLog.action]}</span>
                        {selectedLog.action}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Severity:</span>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedLog.severity)}`}>
                        {selectedLog.severity}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Entity Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Module:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.module}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Entity:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.entity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Entity ID:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.entityId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                      <span className="text-gray-900 dark:text-white">{selectedLog.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Description</h4>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedLog.description}
                </p>
              </div>

              {/* Changes */}
              {selectedLog.changes && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Changes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Before</h5>
                      <pre className="text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-gray-900 dark:text-white overflow-x-auto">
                        {selectedLog.changes.before ? JSON.stringify(selectedLog.changes.before, null, 2) : 'null'}
                      </pre>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">After</h5>
                      <pre className="text-xs bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-gray-900 dark:text-white overflow-x-auto">
                        {selectedLog.changes.after ? JSON.stringify(selectedLog.changes.after, null, 2) : 'null'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Technical Details</h4>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>User Agent:</strong><br />
                    {selectedLog.userAgent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredLogs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No audit logs found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
}