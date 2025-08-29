const stats = [
  {
    name: 'Total Quotations',
    stat: '24',
    icon: '📄',
    change: '+12%',
    changeType: 'increase',
    color: 'blue',
    detail: '3 new this week'
  },
  {
    name: 'Active Projects',
    stat: '8',
    icon: '📁',
    change: '+2.02%',
    changeType: 'increase',
    color: 'green',
    detail: '2 completing soon'
  },
  {
    name: 'Pending Invoices',
    stat: '$1,24,000',
    icon: '📋',
    change: '-3.13%',
    changeType: 'decrease',
    color: 'yellow',
    detail: '5 overdue'
  },
  {
    name: 'Monthly Revenue',
    stat: '$8,45,000',
    icon: '💰',
    change: '+8.2%',
    changeType: 'increase',
    color: 'purple',
    detail: 'Target: $10L'
  },
  {
    name: 'Active Employees',
    stat: '25',
    icon: '👤',
    change: '+4.2%',
    changeType: 'increase',
    color: 'indigo',
    detail: '1 new hire'
  },
  {
    name: 'Inventory Value',
    stat: '$28.5L',
    icon: '📦',
    change: '+2.8%',
    changeType: 'increase',
    color: 'pink',
    detail: '8 low stock items'
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'quotation',
    message: 'New quotation created for ABC Industries',
    time: '2 hours ago',
    user: 'John Smith',
  },
  {
    id: 2,
    type: 'project',
    message: 'Project PO-2024-001 marked as completed',
    time: '4 hours ago',
    user: 'Sarah Johnson',
  },
  {
    id: 3,
    type: 'invoice',
    message: 'Invoice INV-001 payment received',
    time: '6 hours ago',
    user: 'Mike Wilson',
  },
  {
    id: 4,
    type: 'order',
    message: 'Sales order SO-2024-015 created',
    time: '8 hours ago',
    user: 'Emily Davis',
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Follow up with XYZ Corp for quotation',
    dueDate: 'Today',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Submit project drawings for approval',
    dueDate: 'Tomorrow',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Process contractor payment',
    dueDate: '2 days',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Monthly inventory audit',
    dueDate: '1 week',
    priority: 'low',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  green: 'bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  yellow: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
  pink: 'bg-pink-50 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
};

// Chart data for revenue overview
const revenueData = [
  { month: 'Jan', revenue: 350000, target: 400000 },
  { month: 'Feb', revenue: 420000, target: 450000 },
  { month: 'Mar', revenue: 380000, target: 500000 },
  { month: 'Apr', revenue: 520000, target: 550000 },
  { month: 'May', revenue: 680000, target: 600000 },
  { month: 'Jun', revenue: 845000, target: 650000 },
];

const projectStatusData = [
  { status: 'Completed', count: 12, color: 'bg-green-500' },
  { status: 'In Progress', count: 8, color: 'bg-blue-500' },
  { status: 'On Hold', count: 2, color: 'bg-yellow-500' },
  { status: 'Planning', count: 3, color: 'bg-purple-500' },
];

const quickActions = [
  { name: 'New Quotation', icon: '📄', href: '/quotations', color: 'bg-blue-600' },
  { name: 'Add Employee', icon: '👤', href: '/employees', color: 'bg-green-600' },
  { name: 'Create Invoice', icon: '🧾', href: '/invoices', color: 'bg-purple-600' },
  { name: 'View Reports', icon: '📊', href: '/reports', color: 'bg-orange-600' },
];

const priorityColors = {
  high: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50',
  medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50',
  low: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50',
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <a
            key={action.name}
            href={action.href}
            className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
          >
            <span className="text-xl">{action.icon}</span>
            <span className="font-medium text-sm">{action.name}</span>
          </a>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-2 rounded-lg ${colorClasses[item.color]}`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <dl>
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.stat}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      item.changeType === 'increase' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                View all activities →
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{task.title}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-gray-400">⏰</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                View all tasks →
              </button>
            </div>
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {projectStatusData.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${status.color} rounded-full`}></div>
                    <span className="text-sm text-gray-900 dark:text-white">{status.status}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{status.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {projectStatusData.reduce((sum, status) => sum + status.count, 0)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue vs Target</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-64">
            <div className="flex items-end justify-between h-48 space-x-2">
              {revenueData.map((data, index) => {
                const revenueHeight = (data.revenue / Math.max(...revenueData.map(d => d.target))) * 100;
                const targetHeight = (data.target / Math.max(...revenueData.map(d => d.target))) * 100;
                
                return (
                  <div key={index} className="flex-1 flex items-end justify-center space-x-1">
                    <div className="w-6 bg-gray-200 dark:bg-gray-600 rounded-t relative" style={{ height: `${targetHeight}%` }}>
                      <div 
                        className="w-full bg-blue-500 rounded-t absolute bottom-0" 
                        style={{ height: `${(revenueHeight/targetHeight) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4">
              {revenueData.map((data, index) => (
                <div key={index} className="text-center flex-1">
                  <div className="text-xs font-medium text-gray-900 dark:text-white">{data.month}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">${(data.revenue / 100000).toFixed(1)}L</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">${(data.target / 100000).toFixed(1)}L</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <span className="text-green-600 dark:text-green-400 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Profit Margin</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">24.5%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Customer Satisfaction</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">94.8%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <span className="text-purple-600 dark:text-purple-400 text-xl">⚡</span>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Avg Project Time</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">18 days</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <span className="text-orange-600 dark:text-orange-400 text-xl">📈</span>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">+15.2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}