import { useState } from 'react';

const SalesOrderForm = ({ salesOrder = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: salesOrder?.customer || '',
    customerPONumber: salesOrder?.customerPONumber || '',
    deliveryLocation: salesOrder?.deliveryLocation || '',
    poIssueDate: salesOrder?.poIssueDate || new Date().toISOString().split('T')[0],
    uploadedPDF: salesOrder?.uploadedPDF || null,
    linkedQuotation: salesOrder?.linkedQuotation || '',
    notes: salesOrder?.notes || '',
    terms: salesOrder?.terms || '',
    status: salesOrder?.status || 'pending'
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Sample customers for dropdown
  const customers = [
    'ABC Industries Ltd.',
    'XYZ Corporation',
    'Tech Solutions Pvt Ltd',
    'Global Enterprises',
    'Construction Corp',
    'Manufacturing Inc.'
  ];

  // Sample quotations for linking
  const availableQuotations = [
    { id: 'QT-2024-001', customer: 'ABC Industries Ltd.', amount: '₹1,25,000' },
    { id: 'QT-2024-002', customer: 'XYZ Corporation', amount: '₹2,50,000' },
    { id: 'QT-2024-003', customer: 'Tech Solutions Pvt Ltd', amount: '₹75,000' }
  ];

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, uploadedPDF: file });
      setErrors({ ...errors, uploadedPDF: '' });
    } else {
      setErrors({ ...errors, uploadedPDF: 'Please upload a valid PDF file' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer is required';
    }
    
    if (!formData.customerPONumber.trim()) {
      newErrors.customerPONumber = 'Customer PO Number is required';
    }
    
    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = 'Delivery Location is required';
    }
    
    if (!formData.poIssueDate) {
      newErrors.poIssueDate = 'PO Issue Date is required';
    }
    
    if (!formData.uploadedPDF) {
      newErrors.uploadedPDF = 'Customer PO PDF upload is mandatory';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const salesOrderData = {
      ...formData,
      id: salesOrder?.id || `SO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      status: action === 'complete' ? 'completed' : 'draft',
      createdAt: salesOrder?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Auto-generate project data
      projectData: {
        id: `PRJ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        name: `${formData.customer} - ${formData.customerPONumber}`,
        customer: formData.customer,
        poNumber: formData.customerPONumber,
        deliveryLocation: formData.deliveryLocation,
        startDate: formData.poIssueDate,
        status: 'open',
        createdFrom: 'sales_order'
      }
    };

    onSave(salesOrderData, action);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {salesOrder ? 'Edit Sales Order' : 'Create New Sales Order'}
        </h3>
      </div>

      <form className="p-6 space-y-6">
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Customer Name *
            </label>
            <select
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.customer ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a customer</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
            {errors.customer && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customer}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Customer PO Number *
            </label>
            <input
              type="text"
              value={formData.customerPONumber}
              onChange={(e) => setFormData({ ...formData, customerPONumber: e.target.value })}
              placeholder="Enter customer PO number"
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.customerPONumber ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.customerPONumber && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.customerPONumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Delivery Location *
            </label>
            <input
              type="text"
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              placeholder="Enter delivery location"
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.deliveryLocation ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.deliveryLocation && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deliveryLocation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PO Issue Date *
            </label>
            <input
              type="date"
              value={formData.poIssueDate}
              onChange={(e) => setFormData({ ...formData, poIssueDate: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.poIssueDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.poIssueDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.poIssueDate}</p>
            )}
          </div>
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer PO PDF Upload *
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
              dragActive
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : errors.uploadedPDF
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <span className="text-5xl">📄</span>
              </div>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a PDF file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
              {formData.uploadedPDF && (
                <div className="mt-2">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✅ {formData.uploadedPDF.name || 'PDF uploaded successfully'}
                  </p>
                </div>
              )}
            </div>
          </div>
          {errors.uploadedPDF && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.uploadedPDF}</p>
          )}
        </div>

        {/* Link Quotation (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Link Accepted Quotation (Optional)
          </label>
          <select
            value={formData.linkedQuotation}
            onChange={(e) => setFormData({ ...formData, linkedQuotation: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a quotation to link</option>
            {availableQuotations
              .filter(q => q.customer === formData.customer)
              .map((quotation) => (
                <option key={quotation.id} value={quotation.id}>
                  {quotation.id} - {quotation.amount}
                </option>
              ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            You can link a quotation after marking the sales order as complete.
          </p>
        </div>

        {/* Terms and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Project Creation Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-blue-400 text-xl">ℹ️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Automatic Project Creation
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  When you save this sales order, a project will be automatically created with the following details:
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Project Name: {formData.customer} - {formData.customerPONumber}</li>
                  <li>Start Date: {formData.poIssueDate}</li>
                  <li>Delivery Location: {formData.deliveryLocation}</li>
                  <li>Status: Open</li>
                </ul>
              </div>
            </div>
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
            onClick={(e) => handleSubmit(e, 'complete')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">✅</span>
            Save & Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesOrderForm;