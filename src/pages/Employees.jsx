import { useState } from 'react';

const initialEmployees = [
  {
    id: 'EMP-001',
    empId: 'PC001',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@portacabin.com',
    phone: '+91-9876543210',
    position: 'Site Supervisor',
    department: 'Operations',
    joiningDate: '2023-01-15',
    salary: {
      basic: 25000,
      foodAllowance: 5000,
      accommodationAllowance: 8000,
      effectiveDate: '2024-01-01'
    },
    shiftHours: 10,
    status: 'active',
    skills: ['Welding', 'Quality Control', 'Safety Management'],
    manager: 'John Manager',
    location: 'Factory - Unit A',
    emergencyContact: {
      name: 'Fatima Hassan',
      relationship: 'Spouse',
      phone: '+91-9876543211'
    },
    documents: [
      { type: 'ID Proof', status: 'verified' },
      { type: 'Address Proof', status: 'verified' },
      { type: 'Educational Certificate', status: 'pending' }
    ],
    attendance: {
      totalDays: 25,
      workingDays: 23,
      overtime: 12,
      leaves: 2
    }
  },
  {
    id: 'EMP-002',
    empId: 'PC002',
    name: 'Priya Sharma',
    email: 'priya.sharma@portacabin.com',
    phone: '+91-9876543212',
    position: 'Quality Inspector',
    department: 'Quality Assurance',
    joiningDate: '2023-03-20',
    salary: {
      basic: 22000,
      foodAllowance: 4000,
      accommodationAllowance: 6000,
      effectiveDate: '2024-01-01'
    },
    shiftHours: 8,
    status: 'active',
    skills: ['Quality Testing', 'Documentation', 'Process Control'],
    manager: 'Sarah Johnson',
    location: 'Factory - Unit B',
    emergencyContact: {
      name: 'Raj Sharma',
      relationship: 'Father',
      phone: '+91-9876543213'
    },
    documents: [
      { type: 'ID Proof', status: 'verified' },
      { type: 'Address Proof', status: 'verified' },
      { type: 'Educational Certificate', status: 'verified' }
    ],
    attendance: {
      totalDays: 25,
      workingDays: 25,
      overtime: 8,
      leaves: 0
    }
  },
  {
    id: 'EMP-003',
    empId: 'PC003',
    name: 'Mohammed Ali',
    email: 'mohammed.ali@portacabin.com',
    phone: '+91-9876543214',
    position: 'Electrician',
    department: 'Installation',
    joiningDate: '2023-06-10',
    salary: {
      basic: 28000,
      foodAllowance: 5000,
      accommodationAllowance: 7000,
      effectiveDate: '2024-01-01'
    },
    shiftHours: 9,
    status: 'active',
    skills: ['Electrical Installation', 'Maintenance', 'Troubleshooting'],
    manager: 'Mike Wilson',
    location: 'Site Office',
    emergencyContact: {
      name: 'Zainab Ali',
      relationship: 'Wife',
      phone: '+91-9876543215'
    },
    documents: [
      { type: 'ID Proof', status: 'verified' },
      { type: 'Address Proof', status: 'verified' },
      { type: 'Trade Certificate', status: 'verified' }
    ],
    attendance: {
      totalDays: 25,
      workingDays: 24,
      overtime: 15,
      leaves: 1
    }
  }
];

const departments = ['All Departments', 'Operations', 'Quality Assurance', 'Installation', 'Administration', 'Sales', 'Accounts'];
const positions = ['Site Supervisor', 'Quality Inspector', 'Electrician', 'Welder', 'Fitter', 'Administrator', 'Sales Executive'];

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('All Departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joiningDate: '',
    salary: {
      basic: 0,
      foodAllowance: 0,
      accommodationAllowance: 0,
      effectiveDate: ''
    },
    shiftHours: 8,
    skills: [],
    manager: '',
    location: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    }
  });

  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    inactive: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    on_leave: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
  };

  const documentStatusColors = {
    verified: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = filterDepartment === 'All Departments' || employee.department === filterDepartment;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...formData, id: selectedEmployee.id } : emp
      ));
    } else {
      // Add new employee
      const newEmployee = {
        ...formData,
        id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
        status: 'active',
        documents: [
          { type: 'ID Proof', status: 'pending' },
          { type: 'Address Proof', status: 'pending' },
          { type: 'Educational Certificate', status: 'pending' }
        ],
        attendance: {
          totalDays: 0,
          workingDays: 0,
          overtime: 0,
          leaves: 0
        }
      };
      setEmployees([...employees, newEmployee]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      empId: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      joiningDate: '',
      salary: {
        basic: 0,
        foodAllowance: 0,
        accommodationAllowance: 0,
        effectiveDate: ''
      },
      shiftHours: 8,
      skills: [],
      manager: '',
      location: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    });
    setSelectedEmployee(null);
    setShowForm(false);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setShowForm(true);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateTotalSalary = (salary) => {
    return (salary.basic || 0) + (salary.foodAllowance || 0) + (salary.accommodationAllowance || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage employee records, onboarding, and details</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Employees
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or email..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.empId} • {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ₹{calculateTotalSalary(employee.salary).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[employee.status]}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewDetails(employee)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-500"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      name="empId"
                      value={formData.empId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Position</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Department</option>
                      {departments.slice(1).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Shift Hours
                    </label>
                    <input
                      type="number"
                      name="shiftHours"
                      value={formData.shiftHours}
                      onChange={handleInputChange}
                      min="1"
                      max="24"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Salary Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Basic Salary
                    </label>
                    <input
                      type="number"
                      name="salary.basic"
                      value={formData.salary.basic}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Food Allowance
                    </label>
                    <input
                      type="number"
                      name="salary.foodAllowance"
                      value={formData.salary.foodAllowance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Accommodation Allowance
                    </label>
                    <input
                      type="number"
                      name="salary.accommodationAllowance"
                      value={formData.salary.accommodationAllowance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Effective Date
                    </label>
                    <input
                      type="date"
                      name="salary.effectiveDate"
                      value={formData.salary.effectiveDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Total Salary: ₹{calculateTotalSalary(formData.salary).toLocaleString()}</strong>
                  </p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Employee Details
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
              {/* Employee Header */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedEmployee.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedEmployee.position} • {selectedEmployee.department}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Employee ID: {selectedEmployee.empId}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    ₹{calculateTotalSalary(selectedEmployee.salary).toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Total Salary</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {selectedEmployee.attendance.workingDays}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Working Days</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {selectedEmployee.attendance.overtime}h
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">Overtime</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                    {selectedEmployee.attendance.leaves}
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">Leaves Taken</div>
                </div>
              </div>

              {/* Details Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Personal Information</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Joining Date:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmployee.joiningDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Manager:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmployee.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmployee.location}</span>
                    </div>
                  </div>
                </div>

                {/* Salary Breakdown */}
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Salary Breakdown</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Basic Salary:</span>
                      <span className="text-gray-900 dark:text-white">₹{selectedEmployee.salary.basic?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Food Allowance:</span>
                      <span className="text-gray-900 dark:text-white">₹{selectedEmployee.salary.foodAllowance?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Accommodation:</span>
                      <span className="text-gray-900 dark:text-white">₹{selectedEmployee.salary.accommodationAllowance?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 dark:text-white font-medium">Total:</span>
                      <span className="text-gray-900 dark:text-white font-medium">₹{calculateTotalSalary(selectedEmployee.salary).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Documents</h5>
                  <div className="space-y-2">
                    {selectedEmployee.documents?.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-900 dark:text-white">{doc.type}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${documentStatusColors[doc.status]}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedEmployee.emergencyContact && (
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Emergency Contact</h5>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <div className="text-gray-900 dark:text-white">{selectedEmployee.emergencyContact.name}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Relationship:</span>
                        <div className="text-gray-900 dark:text-white">{selectedEmployee.emergencyContact.relationship}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <div className="text-gray-900 dark:text-white">{selectedEmployee.emergencyContact.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}