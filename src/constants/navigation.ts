import { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    permissions: ['dashboard'],
  },
  {
    id: 'quotations',
    title: 'Quotations',
    icon: 'description',
    path: '/quotations',
    permissions: ['quotations'],
  },
  {
    id: 'sales-orders',
    title: 'Sales Orders',
    icon: 'receipt_long',
    path: '/sales-orders',
    permissions: ['sales_orders'],
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'account_tree',
    path: '/projects',
    permissions: ['projects'],
  },
  {
    id: 'work-orders',
    title: 'Work Orders',
    icon: 'engineering',
    path: '/work-orders',
    permissions: ['work_orders'],
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: 'receipt',
    path: '/invoices',
    permissions: ['invoices'],
  },
  {
    id: 'inventory',
    title: 'Inventory / Store',
    icon: 'inventory_2',
    path: '/inventory',
    permissions: ['inventory'],
  },
  {
    id: 'payroll',
    title: 'Payroll & HR',
    icon: 'groups',
    path: '/payroll',
    permissions: ['payroll'],
  },
  {
    id: 'contractors',
    title: 'Contractors',
    icon: 'handyman',
    path: '/contractors',
    permissions: ['contractors'],
  },
  {
    id: 'assets',
    title: 'Assets',
    icon: 'hardware',
    path: '/assets',
    permissions: ['assets'],
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'analytics',
    path: '/reports',
    permissions: ['reports'],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
    path: '/settings',
    permissions: ['settings'],
  },
];

export const getAvailableNavigation = (userPermissions: string[]): NavigationItem[] => {
  return navigationItems.filter(item => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  });
};