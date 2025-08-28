import { 
  DocumentTextIcon, 
  ShoppingCartIcon, 
  FolderOpenIcon, 
  DocumentIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Quotations',
    stat: '24',
    icon: DocumentTextIcon,
    change: '+12%',
    changeType: 'increase',
    color: 'blue',
  },
  {
    name: 'Active Projects',
    stat: '8',
    icon: FolderOpenIcon,
    change: '+2.02%',
    changeType: 'increase',
    color: 'green',
  },
  {
    name: 'Pending Invoices',
    stat: '₹1,24,000',
    icon: DocumentIcon,
    change: '-3.13%',
    changeType: 'decrease',
    color: 'yellow',
  },
  {
    name: 'Monthly Revenue',
    stat: '₹8,45,000',
    icon: CurrencyDollarIcon,
    change: '+8.2%',
    changeType: 'increase',
    color: 'purple',
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
};

const priorityColors = {
  high: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50',
  medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50',
  low: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50',
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${colorClasses[item.color]}`}>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {item.stat}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      item.changeType === 'increase' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
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
            <div className="mt-6">
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
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{task.title}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                View all tasks →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Chart will be integrated here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}