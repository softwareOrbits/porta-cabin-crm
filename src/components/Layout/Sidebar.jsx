import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'Quotations', href: '/quotations', icon: '📄' },
  { name: 'Sales Orders', href: '/sales-orders', icon: '🛒' },
  { name: 'Projects', href: '/projects', icon: '📁' },
  { name: 'Work Orders', href: '/work-orders', icon: '🔧' },
  { name: 'Invoices', href: '/invoices', icon: '📋' },
  { name: 'Inventory / Store', href: '/inventory', icon: '🏪' },
  { name: 'Payroll & HR', href: '/payroll', icon: '👥' },
  { name: 'Contractors', href: '/contractors', icon: '👷' },
  { name: 'Assets', href: '/assets', icon: '📦' },
  { name: 'Reports', href: '/reports', icon: '📊' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar({ collapsed, setCollapsed, darkMode, setDarkMode }) {
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Porta Cabin CRM</span>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          {collapsed ? (
            <span className="text-lg">▶</span>
          ) : (
            <span className="text-lg">◀</span>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={collapsed ? item.name : ''}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? (darkMode ? 'Light Mode' : 'Dark Mode') : ''}
        >
          {darkMode ? (
            <span className="text-lg">☀️</span>
          ) : (
            <span className="text-lg">🌙</span>
          )}
          {!collapsed && <span className="ml-3">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* User Profile */}
        <div className={`mt-3 flex items-center ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed ? (
            <div className="flex items-center space-x-3 w-full">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center" title="John Doe - Admin">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">JD</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}