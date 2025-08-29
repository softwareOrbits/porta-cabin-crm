import { useState } from 'react';

const InvoiceForm = ({ invoice = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    salesOrderId: invoice?.salesOrderId || '',
    projectId: invoice?.projectId || '',
    invoiceType: invoice?.invoiceType || 'proforma',
    invoiceDate: invoice?.invoiceDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    linkedProformaInvoices: invoice?.linkedProformaInvoices || [],
    description: invoice?.description || '',
    terms: invoice?.terms || '',
    notes: invoice?.notes || '',
    lineItems: invoice?.lineItems || [
      {
        id: 1,
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        total: 0
      }
    ],
    qrCode: invoice?.qrCode || '',
    zedIntegration: invoice?.zedIntegration || false,
    paymentReceived: invoice?.paymentReceived || 0,
    paymentStatus: invoice?.paymentStatus || 'pending'
  });

  const [errors, setErrors] = useState({});

  // Sample data
  const availableSalesOrders = [
    { id: 'SO-2024-001', customer: 'ABC Industries Ltd.', poNumber: 'PO-ABC-2024-001', amount: 125000 },
    { id: 'SO-2024-002', customer: 'XYZ Corporation', poNumber: 'PO-XYZ-2024-002', amount: 250000 },
    { id: 'SO-2024-003', customer: 'Tech Solutions Pvt Ltd', poNumber: 'PO-TECH-2024-001', amount: 75000 }
  ];

  const availableProjects = [
    { id: 'PRJ-2024-001', name: 'ABC Industries Ltd. - PO-ABC-2024-001', status: 'in_progress' },
    { id: 'PRJ-2024-002', name: 'XYZ Corporation - Office Complex', status: 'completed' },
    { id: 'PRJ-2024-003', name: 'Tech Solutions Pvt Ltd - PO-TECH-2024-001', status: 'open' }
  ];

  const availableProformaInvoices = [
    { id: 'PI-2024-001', salesOrderId: 'SO-2024-001', amount: 50000, paid: true },
    { id: 'PI-2024-002', salesOrderId: 'SO-2024-001', amount: 75000, paid: false },
    { id: 'PI-2024-003', salesOrderId: 'SO-2024-002', amount: 100000, paid: true }
  ];

  const invoiceTypes = [
    { value: 'proforma', label: 'Proforma Invoice', description: 'For tracking and billing purposes' },
    { value: 'tax', label: 'Tax Invoice', description: 'Final official invoice with QR code' }
  ];

  const paymentStatuses = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'partial', label: 'Partial', color: 'orange' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'overdue', label: 'Overdue', color: 'red' }
  ];

  const calculateLineTotal = (quantity, unitPrice, taxRate) => {
    const subtotal = quantity * unitPrice;
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedItems = [...formData.lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    // Recalculate total when quantity, unitPrice, or taxRate changes
    if (['quantity', 'unitPrice', 'taxRate'].includes(field)) {
      const item = updatedItems[index];
      item.total = calculateLineTotal(
        parseFloat(item.quantity) || 0,
        parseFloat(item.unitPrice) || 0,
        parseFloat(item.taxRate) || 0
      );
    }

    setFormData({ ...formData, lineItems: updatedItems });
  };

  const addLineItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0,
      total: 0
    };
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, newItem]
    });
  };

  const removeLineItem = (index) => {
    if (formData.lineItems.length > 1) {
      const updatedItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData({ ...formData, lineItems: updatedItems });
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalTax = formData.lineItems.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    const total = subtotal + totalTax;

    return { subtotal, totalTax, total };
  };

  const calculateRemainingBalance = () => {
    const { total } = calculateTotals();
    if (formData.invoiceType === 'tax' && formData.linkedProformaInvoices.length > 0) {
      const proformaPaid = formData.linkedProformaInvoices.reduce((sum, invoiceId) => {
        const proforma = availableProformaInvoices.find(pi => pi.id === invoiceId);
        return sum + (proforma?.amount || 0);
      }, 0);
      return Math.max(0, total - proformaPaid - formData.paymentReceived);
    }
    return Math.max(0, total - formData.paymentReceived);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.invoiceType === 'tax' && !formData.salesOrderId) {
      newErrors.salesOrderId = 'Sales Order is required for Tax Invoice';
    }
    
    if (!formData.invoiceDate) {
      newErrors.invoiceDate = 'Invoice date is required';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    formData.lineItems.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`lineItem_${index}_description`] = 'Description is required';
      }
      if (item.quantity <= 0) {
        newErrors[`lineItem_${index}_quantity`] = 'Quantity must be greater than 0';
      }
      if (item.unitPrice < 0) {
        newErrors[`lineItem_${index}_unitPrice`] = 'Unit price cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { total } = calculateTotals();
    const remainingBalance = calculateRemainingBalance();

    const invoiceData = {
      ...formData,
      id: invoice?.id || `${formData.invoiceType === 'tax' ? 'TI' : 'PI'}-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      amount: total,
      remainingBalance,
      paymentStatus: remainingBalance === 0 ? 'paid' : formData.paymentReceived > 0 ? 'partial' : 'pending',
      // Auto-generate QR code for tax invoices
      qrCode: formData.invoiceType === 'tax' ? `QR-${Date.now()}` : '',
      zedIntegration: formData.invoiceType === 'tax',
      createdAt: invoice?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(invoiceData, action);
  };

  const { subtotal, totalTax, total } = calculateTotals();
  const remainingBalance = calculateRemainingBalance();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {invoice ? 'Edit Invoice' : 'Create New Invoice'}
        </h3>
      </div>

      <form className="p-6 space-y-6">
        {/* Invoice Type and Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Invoice Type
            </label>
            <div className="space-y-2">
              {invoiceTypes.map((type) => (
                <label key={type.value} className="flex items-start">
                  <input
                    type="radio"
                    name="invoiceType"
                    value={type.value}
                    checked={formData.invoiceType === type.value}
                    onChange={(e) => setFormData({ ...formData, invoiceType: e.target.value })}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {type.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sales Order {formData.invoiceType === 'tax' && '*'}
            </label>
            <select
              value={formData.salesOrderId}
              onChange={(e) => setFormData({ ...formData, salesOrderId: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.salesOrderId ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a sales order</option>
              {availableSalesOrders.map((salesOrder) => (
                <option key={salesOrder.id} value={salesOrder.id}>
                  {salesOrder.id} - {salesOrder.customer} (₹{salesOrder.amount.toLocaleString()})
                </option>
              ))}
            </select>
            {errors.salesOrderId && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.salesOrderId}</p>
            )}
            {formData.invoiceType === 'tax' && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Tax invoices must be linked to a sales order
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project (Optional)
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a project</option>
              {availableProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {paymentStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Invoice Date *
            </label>
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.invoiceDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.invoiceDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.invoiceDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.dueDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate}</p>
            )}
          </div>
        </div>

        {/* Link Proforma Invoices (for Tax Invoices) */}
        {formData.invoiceType === 'tax' && formData.salesOrderId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Link Proforma Invoices
            </label>
            <div className="space-y-2">
              {availableProformaInvoices
                .filter(pi => pi.salesOrderId === formData.salesOrderId)
                .map((proforma) => (
                  <label key={proforma.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.linkedProformaInvoices.includes(proforma.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            linkedProformaInvoices: [...formData.linkedProformaInvoices, proforma.id]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            linkedProformaInvoices: formData.linkedProformaInvoices.filter(id => id !== proforma.id)
                          });
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                      {proforma.id} - ₹{proforma.amount.toLocaleString()} 
                      {proforma.paid && <span className="text-green-600 ml-1">(Paid)</span>}
                    </span>
                  </label>
                ))}
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Link existing proforma invoices to track total project billing
            </p>
          </div>
        )}

        {/* Payment Received */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Received
          </label>
          <input
            type="number"
            value={formData.paymentReceived}
            onChange={(e) => setFormData({ ...formData, paymentReceived: parseFloat(e.target.value) || 0 })}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Line Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Line Items
            </label>
            <button
              type="button"
              onClick={addLineItem}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-1">➕</span>
              Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tax %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {formData.lineItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                        placeholder="Item description..."
                        className={`block w-full px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`lineItem_${index}_description`] ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors[`lineItem_${index}_description`] && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`lineItem_${index}_description`]}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleLineItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className={`block w-20 px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`lineItem_${index}_quantity`] ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors[`lineItem_${index}_quantity`] && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`lineItem_${index}_quantity`]}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className={`block w-24 px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`lineItem_${index}_unitPrice`] ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors[`lineItem_${index}_unitPrice`] && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`lineItem_${index}_unitPrice`]}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.taxRate}
                        onChange={(e) => handleLineItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                        className="block w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ₹{item.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeLineItem(index)}
                        disabled={formData.lineItems.length === 1}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <span className="text-lg">🗑️</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals and Balance */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Tax:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">₹{totalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-base font-medium text-gray-900 dark:text-white">Total:</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
              </div>
              {formData.paymentReceived > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Payment Received:</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">₹{formData.paymentReceived.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span className="text-base font-medium text-gray-900 dark:text-white">Remaining Balance:</span>
                    <span className="text-lg font-bold text-red-600 dark:text-red-400">₹{remainingBalance.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tax Invoice Specific Fields */}
        {formData.invoiceType === 'tax' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Tax Invoice Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                  QR Code
                </label>
                <input
                  type="text"
                  value={formData.qrCode}
                  onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
                  placeholder="Auto-generated"
                  readOnly
                  className="block w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 focus:outline-none"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.zedIntegration}
                  onChange={(e) => setFormData({ ...formData, zedIntegration: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <span className="ml-2 text-sm text-blue-700 dark:text-blue-300">
                  ZED Portal Integration
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              Tax invoices are automatically integrated with ZED portal and cannot be modified once issued.
            </p>
          </div>
        )}

        {/* Description, Terms and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Enter invoice description..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Terms & Conditions
            </label>
            <textarea
              value={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              rows={4}
              placeholder="Enter terms and conditions..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              placeholder="Enter additional notes..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'issue')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">📤</span>
            Issue Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;