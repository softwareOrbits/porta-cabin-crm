# PORTA CABIN CRM Build & UI/UX Implementation Guide

## 1. **Tech Stack**
- **Frontend**: The system will be developed using **React.js** (latest version). React will be the core library for building interactive user interfaces.
- **Build Tool**: **Vite** will be used as the build tool instead of create-react-app for faster development experience, hot module replacement, and optimized builds.
- **Styling**: **Tailwind CSS** will be used for styling the application. Tailwind provides utility-first CSS framework that enables rapid UI development with consistent design tokens and responsive design capabilities.
- **State Management**: Use **React Context API** for simple state management, or **Redux** if the app becomes large enough to require more complex state management.
- **Routing**: **React Router** will be used for handling routing within the application.
- **Version Control**: The codebase will be maintained in **Git** with repositories hosted on **GitHub** or **GitLab**
- **Design Reference**: Follow **Zoho Books** web + mobile app design while creating a **modern, beautiful, and professional-looking interface**.
- **Colors**:
  - Primary: Blue (#0066CC)
  - Secondary: Gray tones similar to Zoho Books
  - Background: White (light mode), Dark Gray (dark mode)
  - Accent colors for better visual hierarchy and modern appeal
- **Fonts**: Use clean sans-serif font (similar to Zoho Books typography) with proper font weights and spacing.
- **UI Quality**: The interface must look **exceptional, polished, and professional** with smooth animations, proper spacing, and modern design patterns.
- **Consistency**: Web and mobile apps must have aligned visual hierarchy with responsive design principles.

---

## 2. **Project Setup & Development Environment**
### Initial Project Creation
- **Use Vite instead of create-react-app**:
  ```bash
  npm create vite@latest porta-cabin-crm -- --template react
  cd porta-cabin-crm
  npm install
  ```
- **Why Vite**: 
  - Faster development server startup
  - Instant hot module replacement (HMR)
  - Optimized build process
  - Better performance for large applications
  - Modern tooling and faster refresh rates

### Development Commands
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Lint Code**: `npm run lint`

### Required Dependencies
- **Core**: React 18+, React Router DOM
- **Styling**: Tailwind CSS, @tailwindcss/forms, @tailwindcss/typography
- **State Management**: React Context API (built-in) or Redux Toolkit
- **UI Components**: Headless UI, Heroicons, or custom components with Tailwind
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios or Fetch API
- **Date Handling**: date-fns or Day.js
- **File Upload**: React Dropzone or similar

---

## 3. Layout & Navigation
### Sidebar
- **Structure** (left sidebar, collapsible):
  1. Dashboard
  2. Quotations
  3. Sales Orders
  4. Projects
  5. Work Orders
  6. Invoices
  7. Inventory / Store
  8. Payroll & HR
  9. Contractors
  10. Assets
  11. Reports
  12. Settings

- **Features**:
  - Collapsible sidebar
  - Active state highlight
  - Hover effects
  - User profile & logout at bottom
  - Dark/Light mode toggle

---

### 3.1. **User Roles and Permissions**
- The system will have a **role-based access control** (RBAC) mechanism. Users will be assigned roles, and these roles will determine their **visibility** and **permissions** within the system.
  
#### Example Roles:
- **Admin**: Full access to all features and records.
- **Manager**: Can create, view, and edit **projects**, **sales orders**, and **quotations**, but cannot delete records.
- **Customer Service**: Can **view** and **edit** customer-specific records they have created or have been assigned to.
  
### 3.1.1. **Visibility Restrictions**
- Users will be restricted to only viewing data related to their assigned or created records:
  - **Customers**: A user can view **only the customers they have created or are assigned to them**.
  - **Sales Orders**: The user can view **sales orders** that are linked to customers they have created or those assigned to them.
  - **Quotations**: Similarly, **quotations** can only be seen by the user who created them or those specifically assigned to them.

### 3.1.2 **Operations**: 
- Users will have rights to **view**, **edit**, and **create** records depending on their role.
- **Yellow marks** will be used to indicate **canceled or restricted operations**, meaning the user does not have the rights to perform that action.

---

## 4. Quotation Flow (Open Format Voucher)
- **Entry Screen**:
  - Customer dropdown (searchable).
  - Tabular entry for line items:
    - Columns: Item Description | Qty | Unit Price | Tax | Total
    - Add/Remove line dynamically.
  - Example entry:
    - Line 1: "11.5 metre x 15 metre cabin" – Qty 1 – $X – Tax % – Total
    - Line 2: "Fiberglass Toilet 1.5m x 1.5m" – Qty 1 – $Y – Tax % – Total
    - Line 3: "Transportation Charges" – Qty 1 – $Z – Tax % – Total
- **Actions**:
  - Save as Draft
  - Send to Customer (via email/PDF)
  - Duplicate Quotation
- **Notes**:
  - Quotations **do not lock inventory**.
  - UX must replicate **Zoho Books quotation interface**.
- **Voucher Format**:
  - The system must support both **Open Format Vouchers** (no inventory lock) and **Inventory-Locked Vouchers**.
  - Open format vouchers include:
    - Quotations
    - Sales Orders
    - Invoices
    - Work Orders (possibly)
  - In open format vouchers, users can freely add custom line items without linking to inventory.
  - Each line must allow:
    - Item description
    - Quantity
    - Unit price
    - Applicable tax
    - Total amount

---

## 5. Sales Order Flow
- **Sales Order Form Fields**:
  - Customer Name (dropdown)
  - Customer PO Number (text)
  - Delivery Location (text / dropdown if predefined)
  - PO Issue Date (date picker)
  - Upload Field: Mandatory **PDF Upload of Customer PO**
- **System Actions**:
  - Validation: SO cannot be saved without uploaded PDF.
  - Upon save:
    - Sales Order record is created.
    - Linked Project is automatically generated using:
      - Customer Name
      - PO Number
      - Delivery Location
      - PO Date
    - Uploaded PDF is attached to both SO and Project records.
  - **Project Status** is automatically set to **open**.
- **Linking Quotations**:
  - Once the SO is **marked done**, the user can link the **accepted quotation** from the list of quotations sent to the customer.
- **Project Start Date**:
  - **Default Start Date**: The **PO issue date** will be used as the **project start date**.
  - Admin users with appropriate rights can **modify the start date** if necessary.
- **Project End Date**:
  - The **end date** is set to the **date the customer signs the delivery note**.
  - Once the delivery note is signed:
    - **No further expenses**, **invoicing**, or **labor assignments** can be added to the project.

---

## 6. Work Order Management
- **Work Orders**:
  - The system must allow **creating Work Orders** associated with a Sales Order and a Project.
  - Work Orders should allow tracking of material requirements, labor assignments, and costs.
- **Project Drawings**:
  - Each project should include **drawings** that can be uploaded at the time of creating a Work Order (e.g., Electrical Drawings, Normal Drawings, Structural Drawings).
  - These **drawings should be linked to the Work Order** and available for reference throughout the project.
- **Linking Work Orders**:
  - After a Sales Order is **done**, a **Work Order** is created and linked to the project.
  - Custom line items can be added (not locked to inventory).
  - The status of Work Orders should be updated as **done** once completed, preventing further changes.

---

## 7. Invoice Management
- **Invoice Creation**:
  - Invoices **cannot be created without a Sales Order**.
  - If there is no **Sales Order**, the system will **reject** invoice creation and display an error.
  - The system will ensure the invoice matches the **project details** before allowing creation.
  
- **Invoice Types**:
  - **Proforma Invoice**:
    - A **Proforma Invoice** is issued for tracking and billing purposes.
    - **Multiple Proforma Invoices** can be issued for the same Sales Order.
    - The system tracks the remaining balance of the Sales Order after each Proforma Invoice is issued.
    - **Example**: If a Sales Order value is 50,000, and a Proforma Invoice of 10,000 is issued, the remaining balance will be updated as 40,000.
    - Payments for **Proforma Invoices** are tracked.
  
  - **Tax Invoice**:
    - A **Tax Invoice** is the final, official invoice linked to the **ZED portal**.
    - It includes a **QR code**.
    - **Once issued**, the **Tax Invoice** cannot be **modified**.
    - The system will ensure that a **valid ZED integration** is maintained for the Tax Invoice generation.
    - **Tax Invoice Linking**:
      - **Proforma Invoices** for the project should be **linked** to the **Tax Invoice** when issued.
      - The system must track the **amount received** from Proforma Invoices and show the **remaining amount** to be paid.
      - Once the full payment is received, the Tax Invoice status will reflect **100% payment**.

---

## 8. Digital Signature for Customer
- **Digital Signature Process**:
  - A **link** is sent to the customer for them to **digitally sign**.
  - When the customer clicks the link, they will be prompted with a small form to **enter their details**.
  - The customer can **digitally sign** the document if there are **no issues**.
  - If there are issues, the system will **not allow the signature**.
  - Once the customer **finalizes the signature**, the system will automatically **record** the signature.
  - The system will track all **digitally signed customers** and store the signature information securely.

---

## 9. Employee Section (Attendance & Work Hours)
- **Employee Management**:
  - A section for **employee attendance** will be available in the system.
  - Employees will have their **work hours** tracked in a **spreadsheet** format.
  - The system will track:
    - **Total work hours** for each employee.
    - **Absences and deductions** for each employee.
    - **Monthly summary** of attendance and deductions.
  - At the **end of each month**, the system will **close** attendance records for that month on the **2nd of the next month**. Employees cannot edit their attendance for the previous month.
  - Only **Accounts** or **Senior management** will have the rights to **edit** closed records.

---

## 10. Salary Management
- **Salary Details**:
  - The system will store and manage **salary information** for each employee, including:
    - **Basic pay**
    - **Food allowance**
    - **Accommodation allowance**
    - **Effective date** for salary changes (e.g., salary changes starting from 1st January).
- **Salary Adjustments**:
  - If an employee's salary changes mid-month, the system will calculate the salary for the month based on the **effective date**.
  - **Example**: If an employee's salary is 25,000 for the first month and then changed to 27,000, the system will calculate the adjusted salary accordingly.
  
- **Advances**:
  - The system should track **advances** given to employees.
  - When calculating the **final salary**, the system should **deduct** any advances from the employee's total salary.
  
- **Salary Report**:
  - A **full report** will be generated showing:
    - **Salary earned** by the employee.
    - **Advance amount** received.
    - **Total salary after deductions**.
    - **Outstanding advance** to be paid in future months.

---

## 11. Overtime Calculation
- **Overtime Tracking**:
  - Overtime is calculated based on the **hours worked** beyond the standard shift.
  - The **overtime factor** (e.g., 1.5x) will be applied based on the **employee's hourly rate**.
  
- **Shift Hours**:
  - Employees' **shift hours** will be recorded in the system (e.g., 10 hours/day).
  - **Overtime calculation** will be done on an **hourly basis** for any hours worked beyond the normal shift.
  - **Example**: If the employee works for 2 additional hours (overtime), the system will calculate those 2 hours at the **overtime rate** (e.g., 1.5x the normal hourly rate).

---

## 12. Contractor Management
- **Contractor Details**:
  - The **Factory Manager** will enter the **contractor's details**, including:
    - Name
    - Mobile number
  - The **Operations Manager** will specify the **scope of work** for the contractor.
    - Example: For Project X, the contractor will be responsible for **aluminum work**, **windows installation**, or **painting**.
  
- **Scope of Work**:
  - The contractor's work is defined based on the **project status**.
  - **Open projects** can have contractors assigned to them, while **closed projects** cannot have contractors.
  - Contractors can only be assigned to an **active project**.

- **Contractor Assignment**:
  - Once the contractor is entered into the system, the **contractor's role** becomes active from the specified **date**.
  
- **Payments**:
  - The **payments to contractors** are linked to the **project's work scope**.
  - Payments will be calculated based on the **project value** and **work scope**.
  - **Payment approval** is required from **Accounts** to process contractor payments.
  - Payments will not be processed without **approval** from Accounts.
  - Example: If a payment of **6,000** is due for a contractor's work, it must be approved by Accounts before being processed.

---

## 13. Asset Management
- **Asset Entry**:
  - When new assets are purchased (e.g., tools, furniture, vehicles), the system must allow entry of asset details.
  - **Barcode Generation**: A unique **barcode** will be generated for each asset, and this barcode will be printed and attached to the physical asset for tracking.
  - Assets will be categorized (e.g., tools, vehicles, furniture).
- **Depreciation Method**:
  - The system should support the following **depreciation methods**:
    - **Linear Depreciation**: Depreciation is spread evenly over the asset's useful life.
    - **Exponential Depreciation**: Higher depreciation in the earlier years.
    - **Non-linear Depreciation**: Varies based on usage.
  - **Depreciation Entry**: As assets depreciate, the system should automatically calculate and record depreciation amounts.
  - **Final Value**: The system will track the **final value** of the asset after applying depreciation.
  - **Expense Tracking**: Depreciation expenses will be recorded under **expenses** and deducted from the company's income.

---

## 14. Audit Trail
- **Tracking Changes**:
  - The system will maintain an **audit trail** for all critical actions, including:
    - **User logins and logouts**.
    - **Data creation, updates, and deletions**.
    - **Approvals** (e.g., contractor payments, invoice approvals).
    - **Changes to customer records**, **sales orders**, and **quotations**.
  - Each action will be logged with:
    - **Timestamp**
    - **User performing the action**
    - **Description of the action**
    - **Before and after states** (if applicable).
  - The **audit trail** will be visible to **admin users** for monitoring and reviewing.

---

## 15. Zoho Books Integration
- **Integration Scope**:
  - The CRM system should integrate with **Zoho Books** where possible.
  - Integration scope will be expanded in later phases.
  - The system should maintain compatibility with Zoho Books data structure and workflows.

---

## 16. Mobile Application Requirements
- **Mobile App Consistency**:
  - The mobile application should follow the same user experience and design consistency as the Zoho Books mobile app.
  - The goal is to ensure familiarity and ease of use for users who may have used Zoho Books before.
  - All features available on web should be accessible on mobile with appropriate responsive design.

---

## 17. Development Guidelines
- **Code Quality**:
  - Use modern React patterns and hooks
  - Implement proper error handling and loading states
  - Ensure accessibility compliance (WCAG guidelines)
  - Write clean, maintainable code with proper documentation
  
- **Performance**:
  - Implement lazy loading for routes and components
  - Use React.memo and useMemo for performance optimization
  - Implement proper caching strategies
  - Ensure fast page load times and smooth interactions
  
- **Testing**:
  - Write unit tests for components and utilities
  - Implement integration tests for critical workflows
  - Use React Testing Library for component testing
  - Ensure good test coverage for business logic

---

## 18. Deployment & Infrastructure
- **Environment Setup**:
  - Development environment with hot reloading
  - Staging environment for testing
  - Production environment with proper optimization
  - Environment-specific configuration management
  
- **Build Process**:
  - Automated build pipeline
  - Code quality checks and linting
  - Bundle optimization and minification
  - Asset optimization and compression

---

## 19. Security Considerations
- **Authentication & Authorization**:
  - Secure user authentication system
  - Role-based access control implementation
  - Session management and timeout
  - Secure API endpoints with proper validation
  
- **Data Protection**:
  - Input validation and sanitization
  - SQL injection prevention
  - XSS protection
  - Secure file upload handling
  - Data encryption for sensitive information
