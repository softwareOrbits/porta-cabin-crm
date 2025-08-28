// Application constants
export const APP_NAME = 'Porta Cabin CRM';
export const APP_VERSION = '1.0.0';
export const COMPANY_NAME = 'Porta Cabin Solutions';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date formats
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// File upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = {
  documents: ['.pdf', '.doc', '.docx'],
  images: ['.jpg', '.jpeg', '.png', '.gif'],
  drawings: ['.pdf', '.dwg', '.dxf', '.jpg', '.jpeg', '.png'],
  all: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.dwg', '.dxf'],
};

// Status colors
export const STATUS_COLORS = {
  // Quotation statuses
  draft: '#6B7280',
  sent: '#3B82F6',
  accepted: '#10B981',
  rejected: '#EF4444',
  expired: '#F59E0B',
  
  // Project statuses
  open: '#3B82F6',
  in_progress: '#F59E0B',
  completed: '#10B981',
  on_hold: '#6B7280',
  cancelled: '#EF4444',
  
  // Invoice statuses
  paid: '#10B981',
  overdue: '#EF4444',
  
  // General statuses
  pending: '#F59E0B',
  approved: '#10B981',
  active: '#10B981',
  inactive: '#6B7280',
  done: '#10B981',
};

// Currency
export const DEFAULT_CURRENCY = 'USD';
export const CURRENCY_SYMBOL = '$';

// Tax rates
export const DEFAULT_TAX_RATE = 15; // 15%

// System roles
export const SYSTEM_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER_SERVICE: 'customer_service',
  EMPLOYEE: 'employee',
  VIEWER: 'viewer',
} as const;

// Module permissions
export const MODULE_PERMISSIONS = {
  DASHBOARD: 'dashboard',
  QUOTATIONS: 'quotations',
  SALES_ORDERS: 'sales_orders',
  PROJECTS: 'projects',
  WORK_ORDERS: 'work_orders',
  INVOICES: 'invoices',
  INVENTORY: 'inventory',
  PAYROLL: 'payroll',
  CONTRACTORS: 'contractors',
  ASSETS: 'assets',
  REPORTS: 'reports',
  SETTINGS: 'settings',
} as const;

// Asset categories
export const ASSET_CATEGORIES = [
  { value: 'tools', label: 'Tools' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'technology', label: 'Technology' },
  { value: 'other', label: 'Other' },
];

// Depreciation methods
export const DEPRECIATION_METHODS = [
  { value: 'linear', label: 'Linear Depreciation' },
  { value: 'exponential', label: 'Exponential Depreciation' },
  { value: 'nonlinear', label: 'Non-linear Depreciation' },
];

// Drawing types
export const DRAWING_TYPES = [
  { value: 'electrical', label: 'Electrical Drawings' },
  { value: 'structural', label: 'Structural Drawings' },
  { value: 'architectural', label: 'Architectural Drawings' },
  { value: 'other', label: 'Other Drawings' },
];

// Work hours
export const DEFAULT_WORK_HOURS = 8;
export const OVERTIME_MULTIPLIER = 1.5;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME_MODE: 'themeMode',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
  TABLE_PREFERENCES: 'tablePreferences',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PHONE_INVALID: 'Please enter a valid phone number',
  NUMBER_INVALID: 'Please enter a valid number',
  DATE_INVALID: 'Please enter a valid date',
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  FILE_TYPE_INVALID: 'Invalid file type',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  PASSWORD_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
} as const;

// Default pagination
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: DEFAULT_PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

// Debounce delay for search
export const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds

export default {
  APP_NAME,
  APP_VERSION,
  COMPANY_NAME,
  API_BASE_URL,
  DEFAULT_PAGE_SIZE,
  DATE_FORMAT,
  DATETIME_FORMAT,
  STATUS_COLORS,
  DEFAULT_CURRENCY,
  CURRENCY_SYMBOL,
  DEFAULT_TAX_RATE,
  SYSTEM_ROLES,
  MODULE_PERMISSIONS,
  VALIDATION_MESSAGES,
};