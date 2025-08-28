# PORTA CABIN CRM Build & UI/UX Implementation Guide

## 1. **Tech Stack**
- **Frontend**: The system will be developed using **React.js** (latest version). React will be the core library for building interactive user interfaces.
- **UI Library**: **Material-UI (MUI)** will be used for styling the application. MUI provides pre-built React components that follow Google’s Material Design principles. Alternative libraries are to be avoided for consistency and ease of access.
- **State Management**: Use **React Context API** for simple state management, or **Redux** if the app becomes large enough to require more complex state management.
- **Routing**: **React Router** will be used for handling routing within the application.
- **Version Control**: The codebase will be maintained in **Git** with repositories hosted on **GitHub** or **GitLab**
- **Design Reference**: Follow **Zoho Books** web + mobile app design.
- **Colors**:
  - Primary: Blue (#0066CC)
  - Secondary: Gray tones similar to Zoho Books
  - Background: White (light mode), Dark Gray (dark mode)
- **Fonts**: Use clean sans-serif font (similar to Zoho Books typography).
- **Consistency**: Web and mobile apps must have aligned visual hierarchy.

---

## 2. Layout & Navigation
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


### 2.1. **User Roles and Permissions**
- The system will have a **role-based access control** (RBAC) mechanism. Users will be assigned roles, and these roles will determine their **visibility** and **permissions** within the system.
  
#### Example Roles:
- **Admin**: Full access to all features and records.
- **Manager**: Can create, view, and edit **projects**, **sales orders**, and **quotations**, but cannot delete records.
- **Customer Service**: Can **view** and **edit** customer-specific records they have created or have been assigned to.
  
### 2.1.1. **Visibility Restrictions**
- Users will be restricted to only viewing data related to their assigned or created records:
  - **Customers**: A user can view **only the customers they have created or are assigned to them**.
  - **Sales Orders**: The user can view **sales orders** that are linked to customers they have created or those assigned to them.
  - **Quotations**: Similarly, **quotations** can only be seen by the user who created them or those specifically assigned to them.

### 2.1.2 **Operations**: 
- Users will have rights to **view**, **edit**, and **create** records depending on their role.
- **Yellow marks** will be used to indicate **canceled or restricted operations**, meaning the user does not have the rights to perform that action.

---

## 3. Quotation Flow (Open Format Voucher)
- **Entry Screen**:
  - Customer dropdown (searchable).
  - Tabular entry for line items:
    - Columns: Item Description | Qty | Unit Price | Tax | Total
    - Add/Remove line dynamically.
  - Example entry:
    - Line 1: “11.5 metre x 15 metre cabin” – Qty 1 – $X – Tax % – Total
    - Line 2: “Fiberglass Toilet 1.5m x 1.5m” – Qty 1 – $Y – Tax % – Total
    - Line 3: “Transportation Charges” – Qty 1 – $Z – Tax % – Total
- **Actions**:
  - Save as Draft
  - Send to Customer (via email/PDF)
  - Duplicate Quotation
- **Notes**:
  - Quotations **do not lock inventory**.
  - UX must replicate **Zoho Books quotation interface**.

---

## 4. Sales Order Flow
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

## 5. Invoice Management
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

## 6. Digital Signature for Customer
- **Digital Signature Process**:
  - A **link** is sent to the customer for them to **digitally sign**.
  - When the customer clicks the link, they will be prompted with a small form to **enter their details**.
  - The customer can **digitally sign** the document if there are **no issues**.
  - If there are issues, the system will **not allow the signature**.
  - Once the customer **finalizes the signature**, the system will automatically **record** the signature.
  - The system will track all **digitally signed customers** and store the signature information securely.

---

## 7. Audit Trail
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
