import { useState } from 'react';

const initialEmployees = [
  {
    id: 'EMP-001',
    name: 'John Smith',
    designation: 'Senior Electrician',
    basicPay: 25000,
    foodAllowance: 2000,
    accommodationAllowance: 3000,
    totalSalary: 30000,
    workingDays: 26,
    presentDays: 24,
    overtimeHours: 8,
    overtimeRate: 500,
    advances: 5000,
    status: 'active'
  },
  {
    id: 'EMP-002',
    name: 'Sarah Williams',
    designation: 'Project Manager',
    basicPay: 45000,
    foodAllowance: 3000,
    accommodationAllowance: 5000,
    totalSalary: 53000,
    workingDays: 26,
    presentDays: 26,
    overtimeHours: 12,
    overtimeRate: 800,
    advances: 0,
    status: 'active'
  },
  {
    id: 'EMP-003',
    name: 'Mike Johnson',
    designation: 'Helper',
    basicPay: 18000,
    foodAllowance: 1500,
    accommodationAllowance: 2000,
    totalSalary: 21500,
    workingDays: 26,
    presentDays: 22,
    overtimeHours: 4,
    overtimeRate: 300,
    advances: 2000,
    status: 'active'
  }
];

export default function Payroll() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const calculateNetSalary = (employee) => {
    const dailyRate = employee.totalSalary / employee.workingDays;
    const earnedSalary = dailyRate * employee.presentDays;
    const overtimePay = employee.overtimeHours * employee.overtimeRate;
    const grossPay = earnedSalary + overtimePay;
    const netSalary = grossPay - employee.advances;
    return { earnedSalary, overtimePay, grossPay, netSalary };
  };

  const calculateTotalStats = () => {
    const totalGross = employees.reduce((sum, emp) => sum + calculateNetSalary(emp).grossPay, 0);
    const totalAdvances = employees.reduce((sum, emp) => sum + emp.advances, 0);
    const totalNet = employees.reduce((sum, emp) => sum + calculateNetSalary(emp).netSalary, 0);
    return { totalGross, totalAdvances, totalNet };
  };

  const { totalGross, totalAdvances, totalNet } = calculateTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll & HR</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage employee payroll and attendance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span className="mr-2">➕</span>
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">👥</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Employees</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{employees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gross Payroll</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalGross.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">⚡</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advances</h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">${totalAdvances.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Net Payroll</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${totalNet.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Payroll Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Employee Payroll - {selectedMonth}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Overtime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Advances
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {employees.map((employee) => {
                const salary = calculateNetSalary(employee);
                return (
                  <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {employee.id} • {employee.designation}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {employee.presentDays}/{employee.workingDays} days
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((employee.presentDays / employee.workingDays) * 100)}% attendance
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">${salary.earnedSalary.toFixed(0)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Base: ${employee.totalSalary.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">${salary.overtimePay.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {employee.overtimeHours}h @ ${employee.overtimeRate}/h
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        ${salary.grossPay.toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-600 dark:text-red-400">
                        ${employee.advances.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        ${salary.netSalary.toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          title="View Details"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          <span className="text-lg">👁️</span>
                        </button>
                        <button 
                          title="Edit"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        >
                          <span className="text-lg">✏️</span>
                        </button>
                        <button 
                          title="Pay Slip"
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        >
                          <span className="text-lg">🧾</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}