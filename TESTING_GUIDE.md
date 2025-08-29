# 🧪 Testing Guide - Porta Cabin CRM

## 📋 Manual Testing Checklist

### **Pre-Testing Setup**
```bash
# Ensure Node.js 22
nvm use 22

# Install dependencies
npm install

# Start development server
npm run dev

# Application should be running at http://localhost:5173
```

---

## 🎯 **Core Module Testing**

### **1. 📋 Quotations Module**
#### **Test Cases:**
- [ ] **Create New Quotation**
  - Click "New Quotation" button
  - Fill customer details
  - Add multiple line items
  - Verify tax calculations
  - Save as draft
  - Send to customer

- [ ] **Edit Existing Quotation**
  - Select existing quotation
  - Modify line items
  - Update totals
  - Change status

- [ ] **Search & Filter**
  - Search by customer name
  - Filter by status (Draft, Sent, Accepted, Rejected)
  - Verify results update correctly

- [ ] **Quotation Actions**
  - View quotation details
  - Duplicate quotation
  - Delete quotation

**Expected Results:**
- ✅ All form validations work correctly
- ✅ Calculations are accurate
- ✅ Status transitions work properly
- ✅ Search and filters function correctly

---

### **2. 🛒 Sales Orders Module**
#### **Test Cases:**
- [ ] **Create Sales Order**
  - Select customer and project
  - Upload PDF file (test with non-PDF file for validation)
  - Fill delivery location
  - Set PO date
  - Save and verify automatic project creation

- [ ] **Link Quotations**
  - Mark sales order as complete
  - Link accepted quotation
  - Verify data consistency

- [ ] **Project Auto-Creation**
  - Complete sales order
  - Verify project is created with correct details
  - Check start date defaults to PO issue date

**Expected Results:**
- ✅ PDF upload validation works
- ✅ Projects are created automatically
- ✅ All data flows correctly between modules

---

### **3. 🏗️ Projects Module**
#### **Test Cases:**
- [ ] **Project Management**
  - View project details
  - Update project status
  - Upload project drawings
  - Track progress

- [ ] **Delivery Note Signing**
  - Sign delivery note
  - Verify project status changes to completed
  - Confirm no further modifications allowed

- [ ] **Project Grid View**
  - Verify all projects display correctly
  - Test search functionality
  - Filter by status

**Expected Results:**
- ✅ Project status updates correctly
- ✅ Delivery note signing workflow works
- ✅ Project becomes read-only after completion

---

### **4. 🔧 Work Orders Module**
#### **Test Cases:**
- [ ] **Create Work Order**
  - Link to project and sales order
  - Add material requirements
  - Assign labor
  - Calculate costs

- [ ] **Cost Calculations**
  - Add multiple materials with quantities
  - Add multiple workers with hours
  - Verify total cost calculations

- [ ] **Status Management**
  - Change work order status
  - Mark as complete
  - Track progress

**Expected Results:**
- ✅ Cost calculations are accurate
- ✅ Status workflow functions properly
- ✅ All form validations work

---

### **5. 📄 Invoices Module**
#### **Test Cases:**
- [ ] **Proforma Invoice**
  - Create proforma invoice
  - Link to sales order
  - Track payments
  - Calculate remaining balance

- [ ] **Tax Invoice**
  - Create tax invoice
  - Link proforma invoices
  - Verify QR code generation
  - Test ZED integration flag

- [ ] **Payment Tracking**
  - Record payments
  - Update payment status
  - Calculate balances

**Expected Results:**
- ✅ Invoice types work correctly
- ✅ Payment calculations are accurate
- ✅ Status updates properly

---

### **6. 📦 Inventory Module**
#### **Test Cases:**
- [ ] **Add New Items**
  - Create new inventory item
  - Set reorder levels
  - Update quantities

- [ ] **Stock Management**
  - Update item quantities
  - Test low stock alerts
  - Test out of stock status

- [ ] **Search & Filter**
  - Search by item name/SKU
  - Filter by category
  - Filter by status

**Expected Results:**
- ✅ Stock levels update correctly
- ✅ Alerts work properly
- ✅ Search and filters function

---

### **7. 💰 Payroll Module**
#### **Test Cases:**
- [ ] **Employee Management**
  - View employee list
  - Check attendance calculations
  - Verify salary calculations

- [ ] **Payroll Calculations**
  - Test basic salary calculation
  - Verify overtime calculations
  - Check advance deductions

- [ ] **Monthly Processing**
  - Select different months
  - Verify calculations for different periods

**Expected Results:**
- ✅ Salary calculations are accurate
- ✅ Attendance percentages correct
- ✅ Overtime calculations work

---

### **8. 👷 Contractors Module**
#### **Test Cases:**
- [ ] **Contractor Registration**
  - Add new contractor
  - Fill all required details
  - Save successfully

- [ ] **Project Assignment**
  - Assign contractor to project
  - Set scope of work
  - Define contract value

- [ ] **Payment Management**
  - Record contractor payments
  - Update pending amounts
  - Track payment history

**Expected Results:**
- ✅ Contractor data saves correctly
- ✅ Project assignments work
- ✅ Payment tracking accurate

---

### **9. 🏷️ Assets Module**
#### **Test Cases:**
- [ ] **Asset Registration**
  - Add new asset
  - Generate barcode automatically
  - Set depreciation method

- [ ] **Depreciation Calculations**
  - Test linear depreciation
  - Test exponential depreciation
  - Verify current value calculations

- [ ] **Asset Management**
  - Update asset condition
  - Change location
  - Track asset status

**Expected Results:**
- ✅ Barcode generation works
- ✅ Depreciation calculations accurate
- ✅ Asset tracking functional

---

### **10. 📊 Reports Module**
#### **Test Cases:**
- [ ] **Sales Reports**
  - View sales analytics
  - Check monthly trends
  - Verify calculations

- [ ] **Project Reports**
  - View project status
  - Check completion rates
  - Verify progress indicators

- [ ] **Other Reports**
  - Test inventory reports
  - Test contractor reports
  - Verify all data displays correctly

**Expected Results:**
- ✅ All reports load correctly
- ✅ Data is accurate and up-to-date
- ✅ Charts and graphs display properly

---

### **11. ⚙️ Settings Module**
#### **Test Cases:**
- [ ] **General Settings**
  - Update company information
  - Change currency settings
  - Save successfully

- [ ] **User Management**
  - View user list
  - Check role assignments
  - Verify permissions

- [ ] **Notifications**
  - Toggle notification settings
  - Test different preferences

**Expected Results:**
- ✅ Settings save correctly
- ✅ User roles display properly
- ✅ All toggles function

---

## 🎨 **UI/UX Testing**

### **Theme Testing**
- [ ] **Dark Mode**
  - Toggle to dark mode
  - Navigate through all pages
  - Verify all components render correctly
  - Check color contrast and readability

- [ ] **Light Mode**
  - Toggle to light mode
  - Navigate through all pages
  - Verify consistency with design

### **Responsive Design**
- [ ] **Mobile Testing (320px - 768px)**
  - Test all pages on mobile viewport
  - Verify navigation works
  - Check form usability
  - Test touch interactions

- [ ] **Tablet Testing (768px - 1024px)**
  - Test all pages on tablet viewport
  - Verify grid layouts adapt
  - Check sidebar behavior

- [ ] **Desktop Testing (1024px+)**
  - Test all pages on desktop
  - Verify full functionality
  - Check optimal layout usage

### **Navigation Testing**
- [ ] **Sidebar Navigation**
  - Click all menu items
  - Verify correct page loads
  - Test collapsible behavior

- [ ] **Breadcrumb Navigation**
  - Verify breadcrumbs update correctly
  - Test navigation through breadcrumbs

---

## ⚡ **Performance Testing**

### **Load Time Testing**
- [ ] **Initial Load**
  - Measure time to first contentful paint
  - Should be < 1.5 seconds

- [ ] **Page Navigation**
  - Measure time between page transitions
  - Should be < 500ms

### **Build Testing**
```bash
# Test production build
npm run build
npm run preview

# Verify built application works correctly
# Check bundle size (should be ~410KB)
```

---

## 🔧 **Cross-Browser Testing**

### **Browser Compatibility**
- [ ] **Chrome (Latest)**
  - Test all functionality
  - Verify performance

- [ ] **Firefox (Latest)**
  - Test all functionality
  - Verify compatibility

- [ ] **Safari (Latest)**
  - Test all functionality
  - Check for any Safari-specific issues

- [ ] **Edge (Latest)**
  - Test all functionality
  - Verify Microsoft compatibility

---

## 🐛 **Error Handling Testing**

### **Form Validation**
- [ ] **Required Fields**
  - Submit forms with missing required fields
  - Verify error messages display

- [ ] **Data Format Validation**
  - Enter invalid email formats
  - Enter invalid numbers
  - Test date field validation

### **File Upload Testing**
- [ ] **PDF Upload (Sales Orders)**
  - Upload valid PDF files
  - Try to upload non-PDF files
  - Test large file uploads

- [ ] **Drawing Upload (Projects/Work Orders)**
  - Upload valid image/drawing files
  - Test multiple file uploads
  - Test drag and drop functionality

---

## ✅ **Final Acceptance Criteria**

### **All modules must:**
- ✅ Load without errors
- ✅ Display data correctly
- ✅ Handle user interactions properly
- ✅ Show appropriate feedback messages
- ✅ Maintain data consistency
- ✅ Work in both light and dark themes
- ✅ Be responsive across all screen sizes

### **Business logic must:**
- ✅ Follow the specified workflows
- ✅ Calculate totals accurately
- ✅ Enforce business rules
- ✅ Maintain data relationships
- ✅ Handle edge cases gracefully

### **Performance must:**
- ✅ Load within acceptable time limits
- ✅ Handle multiple user interactions smoothly
- ✅ Maintain responsive UI during operations

---

## 🎯 **Test Completion Checklist**

- [ ] All 11 modules tested thoroughly
- [ ] Dark/Light theme tested on all pages
- [ ] Responsive design verified on all viewports
- [ ] Cross-browser compatibility confirmed
- [ ] Performance benchmarks met
- [ ] Error handling verified
- [ ] Business workflows tested end-to-end
- [ ] Documentation matches implementation

**✅ Testing Status: READY FOR PRODUCTION**

When all test cases pass, the application is ready for deployment and production use.