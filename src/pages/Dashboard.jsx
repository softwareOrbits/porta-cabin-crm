import { useState, useEffect } from 'react';

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
  { month: 'Jan', revenue: 350000, target: 400000, growth: 12 },
  { month: 'Feb', revenue: 420000, target: 450000, growth: 20 },
  { month: 'Mar', revenue: 380000, target: 500000, growth: -9.5 },
  { month: 'Apr', revenue: 520000, target: 550000, growth: 37 },
  { month: 'May', revenue: 680000, target: 600000, growth: 31 },
  { month: 'Jun', revenue: 845000, target: 650000, growth: 24 },
];

// Quotation performance data
const quotationData = [
  { month: 'Jan', sent: 45, accepted: 28, rate: 62 },
  { month: 'Feb', sent: 52, accepted: 31, rate: 60 },
  { month: 'Mar', sent: 48, accepted: 35, rate: 73 },
  { month: 'Apr', sent: 55, accepted: 40, rate: 73 },
  { month: 'May', sent: 60, accepted: 44, rate: 73 },
  { month: 'Jun', sent: 58, accepted: 42, rate: 72 },
];

// Employee performance data
const employeePerformance = [
  { name: 'Projects', current: 8, target: 10, percentage: 80 },
  { name: 'Efficiency', current: 94, target: 100, percentage: 94 },
  { name: 'Quality', current: 96, target: 100, percentage: 96 },
  { name: 'Delivery', current: 87, target: 95, percentage: 92 },
];

// Invoice payment status
const invoicePaymentStatus = [
  { status: 'Paid', amount: 450000, count: 12, color: 'bg-green-500' },
  { status: 'Pending', amount: 180000, count: 8, color: 'bg-yellow-500' },
  { status: 'Overdue', amount: 95000, count: 3, color: 'bg-red-500' },
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

// Custom Chart Components
const RevenueBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.target)));
  
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-48 space-x-3">
        {data.map((item, index) => {
          const revenueHeight = (item.revenue / maxValue) * 100;
          const targetHeight = (item.target / maxValue) * 100;
          const achievementRate = (item.revenue / item.target) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full relative">
                {/* Target bar (background) */}
                <div 
                  className="w-8 bg-gray-200 dark:bg-gray-600 rounded-t mx-auto relative transition-all duration-700 ease-out"
                  style={{ height: `${targetHeight}%` }}
                >
                  {/* Revenue bar (foreground) */}
                  <div 
                    className={`w-full rounded-t absolute bottom-0 transition-all duration-1000 ease-out ${
                      achievementRate >= 100 ? 'bg-green-500' : achievementRate >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                    style={{ 
                      height: `${(revenueHeight/targetHeight) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                  
                  {/* Achievement percentage indicator */}
                  {achievementRate >= 100 && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white text-xs px-1 py-0.5 rounded animate-pulse">
                        {Math.round(achievementRate)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Month label */}
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-900 dark:text-white">{item.month}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  ${(item.revenue / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  T: ${(item.target / 100000).toFixed(1)}L
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CircularProgress = ({ percentage, size = 60, strokeWidth = 6, color = 'blue' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const colorClasses = {
    blue: 'stroke-blue-500',
    green: 'stroke-green-500',
    purple: 'stroke-purple-500',
    orange: 'stroke-orange-500',
    red: 'stroke-red-500',
  };
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

const PieChart = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let cumulativePercentage = 0;
  
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={40}
                fill="transparent"
                stroke={item.color.replace('bg-', '').replace('-500', '')}
                strokeWidth="12"
                strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                strokeDashoffset={`${-(strokeDashoffset / 100) * 251.2}`}
                className="transition-all duration-1000 ease-out"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.status}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MiniLineChart = ({ data, height = 40 }) => {
  const maxValue = Math.max(...data.map(d => d.rate));
  const minValue = Math.min(...data.map(d => d.rate));
  const range = maxValue - minValue;
  
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 200;
    const y = height - ((item.rate - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="relative">
      <svg width="200" height={height} className="w-full">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-blue-500 transition-all duration-1000 ease-out"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 200;
          const y = height - ((item.rate - minValue) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="currentColor"
              className="text-blue-500 transition-all duration-1000 ease-out"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <a
            key={action.name}
            href={action.href}
            className={`${action.color} text-white p-3 rounded-lg hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-sm`}
          >
            <span className="text-lg">{action.icon}</span>
            <span className="font-medium text-xs">{action.name}</span>
          </a>
        ))}
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:scale-105 ${isLoaded ? 'animate-pulse' : ''}`}
          >
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <div className={`p-1.5 rounded-lg ${colorClasses[item.color]}`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                    {item.name}
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.stat}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-xs font-medium flex items-center ${
                    item.changeType === 'increase' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {item.changeType === 'increase' ? '📈' : '📉'}
                  {item.change}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content - Enhanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Recent Activities - Compact */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              📋 Recent Activities
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 dark:text-white">{activity.message}</p>
                    <div className="mt-1 flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                View all →
              </button>
            </div>
          </div>
        </div>

        {/* Project Status Distribution - Visual Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              📊 Project Status
            </h3>
          </div>
          <div className="p-4">
            <div className="flex justify-center">
              <PieChart data={projectStatusData} size={100} />
            </div>
          </div>
        </div>
        
        {/* Quotation Success Rate */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              📈 Quotation Success
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">Success Rate</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">72%</span>
              </div>
              <MiniLineChart data={quotationData} height={40} />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">This Month</div>
                  <div className="font-semibold text-gray-900 dark:text-white">42/58</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Last Month</div>
                  <div className="font-semibold text-gray-900 dark:text-white">44/60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Employee Performance */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              👥 Performance
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {employeePerformance.map((metric, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{metric.name}</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{metric.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                        metric.percentage >= 95 ? 'bg-green-500' : 
                        metric.percentage >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ 
                        width: `${metric.percentage}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue vs Target Chart - Enhanced */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                💰 Revenue vs Target
              </h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Target</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="h-48">
              <RevenueBarChart data={revenueData} />
            </div>
            {/* Summary stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">YTD Revenue</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">$31.4L</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">YTD Target</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">$31.5L</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Achievement</div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">99.7%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Invoice Payment Status */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              🧾 Invoice Payment Status
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {invoicePaymentStatus.map((status, index) => {
                const totalAmount = invoicePaymentStatus.reduce((sum, s) => sum + s.amount, 0);
                const percentage = (status.amount / totalAmount) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{status.status}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          ${(status.amount / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {status.count} invoices
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${status.color} transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${percentage}%`,
                          animationDelay: `${index * 300}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Payment summary */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Collection Rate</div>
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">82.6%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Avg Days</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">15 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Compact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <span className="text-green-600 dark:text-green-400 text-sm">💰</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Profit Margin</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">24.5%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-sm">👥</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Customer Satisfaction</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">94.8%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <span className="text-purple-600 dark:text-purple-400 text-sm">⚡</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Avg Project Time</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">18 days</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <span className="text-orange-600 dark:text-orange-400 text-sm">🎯</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">On-time Delivery</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">92.3%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-pink-100 dark:bg-pink-900/50 rounded-lg">
              <span className="text-pink-600 dark:text-pink-400 text-sm">📈</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Growth Rate</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">+18.4%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm">⭐</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Quality Score</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">96.2%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks - Compact */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
            ✅ Upcoming Tasks
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{task.dueDate}</span>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">
                  {task.title}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              View all tasks →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}