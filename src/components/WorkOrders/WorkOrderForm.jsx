import { useState } from 'react';

const WorkOrderForm = ({ workOrder = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    salesOrderId: workOrder?.salesOrderId || '',
    projectId: workOrder?.projectId || '',
    title: workOrder?.title || '',
    description: workOrder?.description || '',
    priority: workOrder?.priority || 'medium',
    assignedTo: workOrder?.assignedTo || '',
    startDate: workOrder?.startDate || new Date().toISOString().split('T')[0],
    expectedCompletionDate: workOrder?.expectedCompletionDate || '',
    actualCompletionDate: workOrder?.actualCompletionDate || '',
    status: workOrder?.status || 'pending',
    materialRequirements: workOrder?.materialRequirements || [
      {
        id: 1,
        description: '',
        quantity: 1,
        unit: '',
        estimatedCost: 0
      }
    ],
    laborAssignments: workOrder?.laborAssignments || [
      {
        id: 1,
        worker: '',
        role: '',
        hoursAllocated: 0,
        hourlyRate: 0
      }
    ],
    drawings: workOrder?.drawings || [],
    notes: workOrder?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Sample data for dropdowns
  const availableSalesOrders = [
    { id: 'SO-2024-001', customer: 'ABC Industries Ltd.', poNumber: 'PO-ABC-2024-001' },
    { id: 'SO-2024-002', customer: 'XYZ Corporation', poNumber: 'PO-XYZ-2024-002' },
    { id: 'SO-2024-003', customer: 'Tech Solutions Pvt Ltd', poNumber: 'PO-TECH-2024-001' }
  ];

  const availableProjects = [
    { id: 'PRJ-2024-001', name: 'ABC Industries Ltd. - PO-ABC-2024-001', status: 'open' },
    { id: 'PRJ-2024-002', name: 'XYZ Corporation - Office Complex', status: 'in_progress' },
    { id: 'PRJ-2024-003', name: 'Tech Solutions Pvt Ltd - PO-TECH-2024-001', status: 'open' }
  ];

  const availableWorkers = [
    'John Smith',
    'Mike Johnson',
    'Sarah Williams',
    'David Brown',
    'Lisa Davis',
    'Robert Wilson'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'gray' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ];

  const workOrderStatuses = [
    { value: 'pending', label: 'Pending', color: 'gray' },
    { value: 'in_progress', label: 'In Progress', color: 'yellow' },
    { value: 'on_hold', label: 'On Hold', color: 'orange' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];

  const units = ['pcs', 'kg', 'm', 'm²', 'm³', 'hrs', 'sets', 'rolls', 'sheets'];

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...formData.materialRequirements];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value
    };
    setFormData({ ...formData, materialRequirements: updatedMaterials });
  };

  const addMaterial = () => {
    const newMaterial = {
      id: Date.now(),
      description: '',
      quantity: 1,
      unit: '',
      estimatedCost: 0
    };
    setFormData({
      ...formData,
      materialRequirements: [...formData.materialRequirements, newMaterial]
    });
  };

  const removeMaterial = (index) => {
    if (formData.materialRequirements.length > 1) {
      const updatedMaterials = formData.materialRequirements.filter((_, i) => i !== index);
      setFormData({ ...formData, materialRequirements: updatedMaterials });
    }
  };

  const handleLaborChange = (index, field, value) => {
    const updatedLabor = [...formData.laborAssignments];
    updatedLabor[index] = {
      ...updatedLabor[index],
      [field]: value
    };
    setFormData({ ...formData, laborAssignments: updatedLabor });
  };

  const addLabor = () => {
    const newLabor = {
      id: Date.now(),
      worker: '',
      role: '',
      hoursAllocated: 0,
      hourlyRate: 0
    };
    setFormData({
      ...formData,
      laborAssignments: [...formData.laborAssignments, newLabor]
    });
  };

  const removeLabor = (index) => {
    if (formData.laborAssignments.length > 1) {
      const updatedLabor = formData.laborAssignments.filter((_, i) => i !== index);
      setFormData({ ...formData, laborAssignments: updatedLabor });
    }
  };

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

  const calculateTotalMaterialCost = () => {
    return formData.materialRequirements.reduce((total, material) => 
      total + (material.quantity * material.estimatedCost), 0
    );
  };

  const calculateTotalLaborCost = () => {
    return formData.laborAssignments.reduce((total, labor) => 
      total + (labor.hoursAllocated * labor.hourlyRate), 0
    );
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Work order title is required';
    }
    
    if (!formData.projectId) {
      newErrors.projectId = 'Project selection is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    formData.materialRequirements.forEach((material, index) => {
      if (!material.description.trim()) {
        newErrors[`material_${index}_description`] = 'Material description is required';
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

    const workOrderData = {
      ...formData,
      id: workOrder?.id || `WO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      totalMaterialCost: calculateTotalMaterialCost(),
      totalLaborCost: calculateTotalLaborCost(),
      totalEstimatedCost: calculateTotalMaterialCost() + calculateTotalLaborCost(),
      createdAt: workOrder?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(workOrderData, action);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {workOrder ? 'Edit Work Order' : 'Create New Work Order'}
        </h3>
      </div>

      <form className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project *
            </label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.projectId ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a project</option>
              {availableProjects
                .filter(project => project.status === 'open' || project.status === 'in_progress')
                .map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sales Order
            </label>
            <select
              value={formData.salesOrderId}
              onChange={(e) => setFormData({ ...formData, salesOrderId: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a sales order</option>
              {availableSalesOrders.map((salesOrder) => (
                <option key={salesOrder.id} value={salesOrder.id}>
                  {salesOrder.id} - {salesOrder.poNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Work Order Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter work order title"
              className={`block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assigned To
            </label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select supervisor</option>
              {availableWorkers.map((worker, index) => (
                <option key={index} value={worker}>
                  {worker}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {workOrderStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Expected Completion Date
            </label>
            <input
              type="date"
              value={formData.expectedCompletionDate}
              onChange={(e) => setFormData({ ...formData, expectedCompletionDate: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Actual Completion Date
            </label>
            <input
              type="date"
              value={formData.actualCompletionDate}
              onChange={(e) => setFormData({ ...formData, actualCompletionDate: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Enter work order description..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Material Requirements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Material Requirements
            </label>
            <button
              type="button"
              onClick={addMaterial}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-1">➕</span>
              Add Material
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
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Est. Cost
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
                {formData.materialRequirements.map((material, index) => (
                  <tr key={material.id}>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={material.description}
                        onChange={(e) => handleMaterialChange(index, 'description', e.target.value)}
                        placeholder="Material description..."
                        className={`block w-full px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`material_${index}_description`] ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors[`material_${index}_description`] && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors[`material_${index}_description`]}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => handleMaterialChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="block w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={material.unit}
                        onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                        className="block w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Unit</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={material.estimatedCost}
                        onChange={(e) => handleMaterialChange(index, 'estimatedCost', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="block w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(material.quantity * material.estimatedCost).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        disabled={formData.materialRequirements.length === 1}
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

          <div className="mt-2 text-right">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Total Material Cost: ${calculateTotalMaterialCost().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Labor Assignments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Labor Assignments
            </label>
            <button
              type="button"
              onClick={addLabor}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="mr-1">➕</span>
              Add Labor
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Worker
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rate/Hr
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
                {formData.laborAssignments.map((labor, index) => (
                  <tr key={labor.id}>
                    <td className="px-4 py-3">
                      <select
                        value={labor.worker}
                        onChange={(e) => handleLaborChange(index, 'worker', e.target.value)}
                        className="block w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select worker</option>
                        {availableWorkers.map((worker, workerIndex) => (
                          <option key={workerIndex} value={worker}>
                            {worker}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={labor.role}
                        onChange={(e) => handleLaborChange(index, 'role', e.target.value)}
                        placeholder="Role/Skill"
                        className="block w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={labor.hoursAllocated}
                        onChange={(e) => handleLaborChange(index, 'hoursAllocated', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.5"
                        className="block w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={labor.hourlyRate}
                        onChange={(e) => handleLaborChange(index, 'hourlyRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="block w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(labor.hoursAllocated * labor.hourlyRate).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => removeLabor(index)}
                        disabled={formData.laborAssignments.length === 1}
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

          <div className="mt-2 text-right">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Total Labor Cost: ${calculateTotalLaborCost().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Work Order Drawings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Work Order Drawings
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

        {/* Cost Summary */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cost Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Material Cost</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${calculateTotalMaterialCost().toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Labor Cost</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">${calculateTotalLaborCost().toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Estimated Cost</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${(calculateTotalMaterialCost() + calculateTotalLaborCost()).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            placeholder="Enter additional notes..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
            Save Work Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkOrderForm;