// Common types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy?: string;
}

// User and Auth types
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  permissions: Permission[];
  phone?: string;
  avatar?: string;
}

export type UserRole = 'admin' | 'manager' | 'customer_service' | 'employee' | 'viewer';

export interface Permission {
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Customer types
export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  address: Address;
  taxId?: string;
  contactPerson: string;
  assignedTo: string; // User ID
  isActive: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Quotation types
export interface Quotation extends BaseEntity {
  quotationNumber: string;
  customerId: string;
  customer?: Customer;
  status: QuotationStatus;
  validUntil: Date;
  lineItems: LineItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  notes?: string;
  terms?: string;
  isAccepted: boolean;
}

export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

// Sales Order types
export interface SalesOrder extends BaseEntity {
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  customerPONumber: string;
  deliveryLocation: string;
  poIssueDate: Date;
  uploadedPOFile: string; // File path
  status: SalesOrderStatus;
  linkedQuotationId?: string;
  linkedProjectId?: string;
  lineItems: LineItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

export type SalesOrderStatus = 'pending' | 'in_progress' | 'done' | 'cancelled';

// Project types
export interface Project extends BaseEntity {
  projectNumber: string;
  name: string;
  customerId: string;
  customer?: Customer;
  salesOrderId: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  deliveryLocation: string;
  customerPONumber: string;
  poIssueDate: Date;
  attachments: string[];
  workOrders: WorkOrder[];
  expenses: ProjectExpense[];
  laborAssignments: LaborAssignment[];
}

export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';

// Work Order types
export interface WorkOrder extends BaseEntity {
  workOrderNumber: string;
  projectId: string;
  project?: Project;
  title: string;
  description: string;
  status: WorkOrderStatus;
  assignedTo: string[]; // User IDs
  startDate: Date;
  endDate?: Date;
  drawings: Drawing[];
  lineItems: LineItem[];
  materials: MaterialRequirement[];
}

export type WorkOrderStatus = 'pending' | 'in_progress' | 'done' | 'cancelled';

export interface Drawing {
  id: string;
  name: string;
  type: DrawingType;
  filePath: string;
  uploadedAt: Date;
}

export type DrawingType = 'electrical' | 'structural' | 'architectural' | 'other';

export interface MaterialRequirement {
  id: string;
  materialName: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  actualCost?: number;
  supplierId?: string;
}

// Invoice types
export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  type: InvoiceType;
  customerId: string;
  customer?: Customer;
  salesOrderId: string;
  projectId: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  lineItems: LineItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  linkedProformaInvoices?: string[]; // For Tax Invoices
  qrCode?: string; // For Tax Invoices
  zedPortalId?: string; // For Tax Invoices
}

export type InvoiceType = 'proforma' | 'tax';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

// Payroll types
export interface Employee extends BaseEntity {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: Date;
  isActive: boolean;
  salary: SalaryDetails;
  attendance: AttendanceRecord[];
}

export interface SalaryDetails {
  basicPay: number;
  foodAllowance: number;
  accommodationAllowance: number;
  effectiveDate: Date;
  hourlyRate: number;
  overtimeMultiplier: number;
  shiftHours: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  totalHours: number;
  overtimeHours: number;
  status: AttendanceStatus;
  notes?: string;
  month: number;
  year: number;
  isClosed: boolean;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'holiday';

export interface PayrollSummary {
  employeeId: string;
  month: number;
  year: number;
  basicPay: number;
  overtimePay: number;
  allowances: number;
  grossPay: number;
  deductions: number;
  advances: number;
  netPay: number;
  status: PayrollStatus;
}

export type PayrollStatus = 'pending' | 'approved' | 'paid';

// Contractor types
export interface Contractor extends BaseEntity {
  name: string;
  phone: string;
  email?: string;
  specialization: string[];
  isActive: boolean;
  projects: ContractorAssignment[];
}

export interface ContractorAssignment {
  id: string;
  contractorId: string;
  projectId: string;
  scopeOfWork: string;
  startDate: Date;
  endDate?: Date;
  status: ContractorStatus;
  payments: ContractorPayment[];
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

export type ContractorStatus = 'assigned' | 'in_progress' | 'completed' | 'terminated';

export interface ContractorPayment {
  id: string;
  amount: number;
  paymentDate: Date;
  description: string;
  approvedBy?: string;
  status: PaymentStatus;
  invoiceNumber?: string;
}

export type PaymentStatus = 'pending' | 'approved' | 'paid' | 'rejected';

// Asset types
export interface Asset extends BaseEntity {
  assetNumber: string;
  barcode: string;
  name: string;
  category: AssetCategory;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  depreciationMethod: DepreciationMethod;
  usefulLife: number; // in years
  location: string;
  condition: AssetCondition;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
}

export type AssetCategory = 'tools' | 'vehicles' | 'furniture' | 'equipment' | 'technology' | 'other';
export type DepreciationMethod = 'linear' | 'exponential' | 'nonlinear';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'retired';

export interface DepreciationRecord {
  id: string;
  assetId: string;
  year: number;
  depreciationAmount: number;
  accumulatedDepreciation: number;
  bookValue: number;
  calculatedAt: Date;
}

// Inventory types
export interface InventoryItem extends BaseEntity {
  itemCode: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitCost: number;
  sellingPrice: number;
  supplierId?: string;
  location: string;
  isActive: boolean;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: MovementType;
  quantity: number;
  reason: string;
  referenceNumber?: string;
  date: Date;
  performedBy: string;
}

export type MovementType = 'in' | 'out' | 'adjustment' | 'transfer';

// Digital Signature types
export interface DigitalSignature {
  id: string;
  documentId: string;
  documentType: DocumentType;
  customerId: string;
  customerName: string;
  customerEmail: string;
  signatureData: string; // Base64 encoded signature
  signatureDate: Date;
  ipAddress: string;
  isValid: boolean;
  verificationCode: string;
}

export type DocumentType = 'quotation' | 'sales_order' | 'invoice' | 'delivery_note' | 'contract';

// Audit Trail types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: AuditAction;
  module: string;
  recordId?: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  beforeState?: any;
  afterState?: any;
  description: string;
}

export type AuditAction = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'approve' | 'reject' | 'send' | 'view';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Dashboard types
export interface DashboardStats {
  totalQuotations: number;
  activeProjects: number;
  pendingInvoices: number;
  totalRevenue: number;
  monthlyGrowth: number;
  recentActivities: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  children?: NavigationItem[];
  permissions?: string[];
}

// Theme types
export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

// Filter and Search types
export interface FilterOptions {
  [key: string]: any;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface SearchFilters {
  query?: string;
  filters?: FilterOptions;
  sort?: SortOptions;
  page?: number;
  limit?: number;
}