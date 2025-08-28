import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  FolderOpenIcon,
  WrenchScrewdriverIcon,
  DocumentIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  UserGroupIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Quotations', href: '/quotations', icon: DocumentTextIcon },
  { name: 'Sales Orders', href: '/sales-orders', icon: ShoppingCartIcon },
  { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
  { name: 'Work Orders', href: '/work-orders', icon: WrenchScrewdriverIcon },
  { name: 'Invoices', href: '/invoices', icon: DocumentIcon },
  { name: 'Inventory / Store', href: '/inventory', icon: BuildingStorefrontIcon },
  { name: 'Payroll & HR', href: '/payroll', icon: UsersIcon },
  { name: 'Contractors', href: '/contractors', icon: UserGroupIcon },
  { name: 'Assets', href: '/assets', icon: CubeIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
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
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
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
              <item.icon className="h-5 w-5 flex-shrink-0" />
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
            <SunIcon className="h-5 w-5 flex-shrink-0" />
          ) : (
            <MoonIcon className="h-5 w-5 flex-shrink-0" />
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