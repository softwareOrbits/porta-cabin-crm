# CRM System Requirements Documentation

## 1. User Interface & Theme
- The CRM system must replicate the **theme, flow, and design of Zoho Books**.
- Fonts, colors, and format should align closely with the Zoho Books web application.
- The **mobile application** should follow the same user experience and design consistency as the Zoho Books mobile app.
- The goal is to ensure familiarity and ease of use for users who may have used Zoho Books before.

---

## 2. Quotation & Integration with Zoho Books
- **Zoho Books Integration**: If possible, the CRM system should integrate with Zoho Books. The scope of integration will be expanded in later phases.
- **Quotation Management**:
  - Users should be able to **create quotations directly in the system**.
  - Quotations can be sent to customers from within the system.
  - Multiple quotations can be created per customer (e.g., 10–20 quotations), out of which only a few may be accepted.
  - Quotation workflow should mirror Zoho Books:
    - **Select Customer** → **Prepare Quotation** → **Send Quotation**.
    - Quotations must support a **tabular format** for line items and vouchers.
- **Voucher Format**:
  - The system must support both **Open Format Vouchers** (no inventory lock) and **Inventory-Locked Vouchers**.
  - Open format vouchers include:
    - Quotations
    - Sales Orders
    - Invoices
    - Work Orders (possibly)
  - In open format vouchers, users can freely add custom line items without linking to inventory.  
    Example:
    - `11.5 metre x 15 metre cabin`
    - `Brief toilet fiberglass 1.5m x 1.5m`
    - `Transportation charges`
  - Each line must allow:
    - Item description
    - Quantity
    - Unit price
    - Applicable tax
    - Total amount
- **Interface Inspiration**: The quotation and voucher interface should resemble Zoho Books for ease of adoption.

---

## 3. Sales Order (SO) Management
- **Customer PO = Sales Order**: Each Sales Order must be based on the **customer’s Purchase Order (PO)**.
- **Mandatory Upload**: A **PDF copy of the customer PO must be uploaded** at the time of SO creation.
- **Sales Order Entry Requirements**:
  - Customer Name
  - Customer PO Number
  - Delivery Location
  - Date of PO issued by customer
- **Automatic Project Creation**:
  - Upon entry of Sales Order + PO details, a **Project is automatically created** in the system.
  - Project is linked to the uploaded PO.
  - **Project Status** is set to **open** when the project is created.
- **Project Linking**:
  - Once a Sales Order is marked **done**, the user can link the **accepted quotation** to the project.
- **Project Start Date**:
  - **Default Start Date**: The **PO issue date** will be used as the **project start date**.
  - Admin users with appropriate rights can **modify the start date** if necessary.
- **Project End Date**:
  - The **end date** is set to the **date the customer signs the delivery note**.
  - Once the delivery note is signed:
    - **No further expenses**, **invoicing**, or **labor assignments** can be added to the project.

---

## 4. Work Order Management
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

## 7. Employee Section (Attendance & Work Hours)
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

## 8. Salary Management
- **Salary Details**:
  - The system will store and manage **salary information** for each employee, including:
    - **Basic pay**
    - **Food allowance**
    - **Accommodation allowance**
    - **Effective date** for salary changes (e.g., salary changes starting from 1st January).
- **Salary Adjustments**:
  - If an employee’s salary changes mid-month, the system will calculate the salary for the month based on the **effective date**.
  - **Example**: If an employee's salary is 25,000 for the first month and then changed to 27,000, the system will calculate the adjusted salary accordingly.
  
- **Advances**:
  - The system should track **advances** given to employees.
  - When calculating the **final salary**, the system should **deduct** any advances from the employee’s total salary.
  
- **Salary Report**:
  - A **full report** will be generated showing:
    - **Salary earned** by the employee.
    - **Advance amount** received.
    - **Total salary after deductions**.
    - **Outstanding advance** to be paid in future months.
  
---

## 9. Overtime Calculation
- **Overtime Tracking**:
  - Overtime is calculated based on the **hours worked** beyond the standard shift.
  - The **overtime factor** (e.g., 1.5x) will be applied based on the **employee's hourly rate**.
  
- **Shift Hours**:
  - Employees’ **shift hours** will be recorded in the system (e.g., 10 hours/day).
  - **Overtime calculation** will be done on an **hourly basis** for any hours worked beyond the normal shift.
  - **Example**: If the employee works for 2 additional hours (overtime), the system will calculate those 2 hours at the **overtime rate** (e.g., 1.5x the normal hourly rate).

---

## 10. Contractor Management
- **Contractor Details**:
  - The **Factory Manager** will enter the **contractor’s details**, including:
    - Name
    - Mobile number
  - The **Operations Manager** will specify the **scope of work** for the contractor.
    - Example: For Project X, the contractor will be responsible for **aluminum work**, **windows installation**, or **painting**.
  
- **Scope of Work**:
  - The contractor’s work is defined based on the **project status**.
  - **Open projects** can have contractors assigned to them, while **closed projects** cannot have contractors.
  - Contractors can only be assigned to an **active project**.

- **Contractor Assignment**:
  - Once the contractor is entered into the system, the **contractor's role** becomes active from the specified **date**.
  
- **Payments**:
  - The **payments to contractors** are linked to the **project’s work scope**.
  - Payments will be calculated based on the **project value** and **work scope**.
  - **Payment approval** is required from **Accounts** to process contractor payments.
  - Payments will not be processed without **approval** from Accounts.
  - Example: If a payment of **6,000** is due for a contractor’s work, it must be approved by Accounts before being processed.

---

## 11. Asset Management
- **Asset Entry**:
  - When new assets are purchased (e.g., tools, furniture, vehicles), the system must allow entry of asset details.
  - **Barcode Generation**: A unique **barcode** will be generated for each asset, and this barcode will be printed and attached to the physical asset for tracking.
  - Assets will be categorized (e.g., tools, vehicles, furniture).
- **Depreciation Method**:
  - The system should support the following **depreciation methods**:
    - **Linear Depreciation**: Depreciation is spread evenly over the asset’s useful life.
    - **Exponential Depreciation**: Higher depreciation in the earlier years.
    - **Non-linear Depreciation**: Varies based on usage.
  - **Depreciation Entry**: As assets depreciate, the system should automatically calculate and record depreciation amounts.
  - **Final Value**: The system will track the **final value** of the asset after applying depreciation.
  - **Expense Tracking**: Depreciation expenses will be recorded under **expenses** and deducted from the company’s income.

---

## 12. Audit Trail
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
