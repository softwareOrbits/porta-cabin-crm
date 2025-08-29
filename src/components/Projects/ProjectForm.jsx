import { useState } from 'react';

const ProjectForm = ({ project = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    customer: project?.customer || '',
    salesOrderId: project?.salesOrderId || '',
    poNumber: project?.poNumber || '',
    deliveryLocation: project?.deliveryLocation || '',
    startDate: project?.startDate || new Date().toISOString().split('T')[0],
    expectedEndDate: project?.expectedEndDate || '',
    actualEndDate: project?.actualEndDate || '',
    status: project?.status || 'open',
    description: project?.description || '',
    notes: project?.notes || '',
    deliveryNoteDate: project?.deliveryNoteDate || '',
    deliveryNoteSigned: project?.deliveryNoteSigned || false,
    signedBy: project?.signedBy || '',
    drawings: project?.drawings || []
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

  // Sample sales orders for linking
  const availableSalesOrders = [
    { id: 'SO-2024-001', customer: 'ABC Industries Ltd.', poNumber: 'PO-ABC-2024-001' },
    { id: 'SO-2024-002', customer: 'XYZ Corporation', poNumber: 'PO-XYZ-2024-002' },
    { id: 'SO-2024-003', customer: 'Tech Solutions Pvt Ltd', poNumber: 'PO-TECH-2024-001' }
  ];

  const projectStatuses = [
    { value: 'open', label: 'Open', color: 'blue' },
    { value: 'in_progress', label: 'In Progress', color: 'yellow' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'on_hold', label: 'On Hold', color: 'gray' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  const handleFileUpload = (files) => {
    const newDrawings = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      uploadedAt: new Date().toISOString()
    }));
    
    setFormData({
      ...formData,
      drawings: [...formData.drawings, ...newDrawings]
    });
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeDrawing = (drawingId) => {
    setFormData({
      ...formData,
      drawings: formData.drawings.filter(d => d.id !== drawingId)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.deliveryNoteSigned && !formData.signedBy.trim()) {
      newErrors.signedBy = 'Signed by field is required when delivery note is signed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const projectData = {
      ...formData,
      id: project?.id || `PRJ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(projectData, action);
  };

  const handleDeliveryNoteSign = () => {
    if (confirm('Sign delivery note? This will close the project and prevent further modifications.')) {
      setFormData({
        ...formData,
        deliveryNoteSigned: true,
        deliveryNoteDate: new Date().toISOString().split('T')[0],
        actualEndDate: new Date().toISOString().split('T')[0],
        status: 'completed'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {project ? 'Edit Project' : 'Create New Project'}
        </h3>
      </div>

      <form className="p-6 space-y-6">
        {/* Basic Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Customer *
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
              Linked Sales Order
            </label>
            <select
              value={formData.salesOrderId}
              onChange={(e) => setFormData({ ...formData, salesOrderId: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a sales order</option>
              {availableSalesOrders
                .filter(so => so.customer === formData.customer)
                .map((salesOrder) => (
                  <option key={salesOrder.id} value={salesOrder.id}>
                    {salesOrder.id} - {salesOrder.poNumber}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PO Number
            </label>
            <input
              type="text"
              value={formData.poNumber}
              onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
              placeholder="Enter PO number"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Delivery Location
            </label>
            <input
              type="text"
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              placeholder="Enter delivery location"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Dates and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.startDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expected End Date
            </label>
            <input
              type="date"
              value={formData.expectedEndDate}
              onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual End Date
            </label>
            <input
              type="date"
              value={formData.actualEndDate}
              onChange={(e) => setFormData({ ...formData, actualEndDate: e.target.value })}
              disabled={formData.deliveryNoteSigned}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              disabled={formData.deliveryNoteSigned}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {projectStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Drawings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Drawings
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
              dragActive
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <span className="text-5xl">📋</span>
              </div>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="drawings-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload drawings</span>
                  <input
                    id="drawings-upload"
                    name="drawings-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, DWG, DXF, JPG, PNG files
              </p>
            </div>
          </div>

          {/* Uploaded Drawings List */}
          {formData.drawings.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Drawings:</h4>
              {formData.drawings.map((drawing) => (
                <div key={drawing.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-500">📄</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{drawing.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(drawing.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDrawing(drawing.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <span className="text-lg">🗑️</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delivery Note Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Delivery Note</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Note Date
              </label>
              <input
                type="date"
                value={formData.deliveryNoteDate}
                onChange={(e) => setFormData({ ...formData, deliveryNoteDate: e.target.value })}
                disabled={formData.deliveryNoteSigned}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Signed By
              </label>
              <input
                type="text"
                value={formData.signedBy}
                onChange={(e) => setFormData({ ...formData, signedBy: e.target.value })}
                placeholder="Name of person who signed"
                disabled={formData.deliveryNoteSigned}
                className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${
                  errors.signedBy ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.signedBy && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.signedBy}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.deliveryNoteSigned}
                onChange={(e) => setFormData({ ...formData, deliveryNoteSigned: e.target.checked })}
                disabled={formData.deliveryNoteSigned}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Delivery Note Signed
              </span>
            </label>

            {!formData.deliveryNoteSigned && (
              <button
                type="button"
                onClick={handleDeliveryNoteSign}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="mr-1">✍️</span>
                Sign Delivery Note
              </button>
            )}
          </div>

          {formData.deliveryNoteSigned && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-green-400 text-lg">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Delivery note has been signed. Project is completed and locked from further modifications.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Enter project description..."
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
            onClick={(e) => handleSubmit(e, 'save')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="mr-2">💾</span>
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;