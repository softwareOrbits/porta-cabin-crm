import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Autocomplete,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Upload,
  Delete,
  PictureAsPdf,
  Save,
  AccountTree,
  Visibility,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import LoadingSpinner from '../../common/LoadingSpinner';
import { SalesOrder, Customer, Project } from '../../../types';
import { formatFileSize, getFileExtension } from '../../../utils';

// Validation schema
const salesOrderSchema = yup.object({
  customerId: yup.string().required('Customer is required'),
  customerPONumber: yup.string().required('Customer PO Number is required'),
  deliveryLocation: yup.string().required('Delivery location is required'),
  poIssueDate: yup.date().required('PO issue date is required'),
  uploadedPOFile: yup.string().required('Customer PO file upload is required'),
  linkedQuotationId: yup.string(),
  notes: yup.string(),
});

type SalesOrderFormData = yup.InferType<typeof salesOrderSchema>;

interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

const SalesOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [availableQuotations, setAvailableQuotations] = useState<any[]>([]);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [projectPreview, setProjectPreview] = useState<Partial<Project> | null>(null);
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  // Mock customers data - replace with actual API call
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: 'cust1',
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1234567890',
        address: {
          street: '123 Business St',
          city: 'Business City',
          state: 'BC',
          zipCode: '12345',
          country: 'Country',
        },
        contactPerson: 'John Smith',
        assignedTo: 'user1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1',
      },
      {
        id: 'cust2',
        name: 'Tech Solutions Ltd',
        email: 'info@techsolutions.com',
        phone: '+1234567891',
        address: {
          street: '456 Tech Ave',
          city: 'Tech City',
          state: 'TC',
          zipCode: '67890',
          country: 'Country',
        },
        contactPerson: 'Jane Doe',
        assignedTo: 'user1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1',
      },
    ];
    setCustomers(mockCustomers);
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SalesOrderFormData>({
    resolver: yupResolver(salesOrderSchema),
    defaultValues: {
      customerId: '',
      customerPONumber: '',
      deliveryLocation: '',
      poIssueDate: new Date(),
      uploadedPOFile: '',
      linkedQuotationId: '',
      notes: '',
    },
  });

  const watchedCustomerId = watch('customerId');
  const watchedCustomerPO = watch('customerPONumber');
  const watchedDeliveryLocation = watch('deliveryLocation');
  const watchedPODate = watch('poIssueDate');

  // Load quotations when customer changes
  useEffect(() => {
    if (watchedCustomerId) {
      // Mock quotations for the selected customer
      const mockQuotations = [
        {
          id: 'quo1',
          quotationNumber: 'QUO-2024-001',
          total: 28750,
          status: 'sent',
          createdAt: new Date('2024-01-10'),
        },
        {
          id: 'quo2',
          quotationNumber: 'QUO-2024-003',
          total: 15250,
          status: 'accepted',
          createdAt: new Date('2024-01-08'),
        },
      ];
      setAvailableQuotations(mockQuotations);
    } else {
      setAvailableQuotations([]);
    }
  }, [watchedCustomerId]);

  // Generate project preview when form data changes
  useEffect(() => {
    if (watchedCustomerId && watchedCustomerPO && watchedDeliveryLocation && watchedPODate) {
      const customer = customers.find(c => c.id === watchedCustomerId);
      if (customer) {
        const projectPreview: Partial<Project> = {
          projectNumber: `PRJ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
          name: `${customer.name} - ${watchedCustomerPO}`,
          customerId: watchedCustomerId,
          deliveryLocation: watchedDeliveryLocation,
          customerPONumber: watchedCustomerPO,
          poIssueDate: watchedPODate,
          startDate: watchedPODate,
          status: 'open',
        };
        setProjectPreview(projectPreview);
      }
    } else {
      setProjectPreview(null);
    }
  }, [watchedCustomerId, watchedCustomerPO, watchedDeliveryLocation, watchedPODate, customers]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only PDF files are allowed');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    setUploadError('');
    const uploadedFile: UploadedFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    };

    setUploadedFile(uploadedFile);
    setValue('uploadedPOFile', file.name); // Set form value for validation
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValue('uploadedPOFile', '');
    setUploadError('');
  };

  const onSubmit = async (data: SalesOrderFormData) => {
    try {
      setIsLoading(true);

      if (!uploadedFile) {
        setUploadError('Please upload the customer PO file');
        return;
      }

      // Create sales order data
      const salesOrderData: Partial<SalesOrder> = {
        ...data,
        orderNumber: isEditing ? undefined : `SO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        status: 'pending',
        subtotal: 0, // Will be calculated based on linked quotation or manual entry
        taxAmount: 0,
        total: 0,
        lineItems: [], // Will be populated from linked quotation or manual entry
      };

      // TODO: Upload file to server and get file path
      const uploadedFilePath = `/uploads/${uploadedFile.name}`;
      salesOrderData.uploadedPOFile = uploadedFilePath;

      // TODO: Replace with actual API call
      console.log('Saving sales order:', salesOrderData);
      console.log('Project to be created:', projectPreview);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      navigate('/sales-orders');
    } catch (error) {
      console.error('Error saving sales order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Creating sales order and project..." />;
  }

  return (
    <Box>
      <PageHeader
        title={isEditing ? 'Edit Sales Order' : 'Create New Sales Order'}
        subtitle="Create a sales order based on customer purchase order"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Sales Orders', path: '/sales-orders' },
          { label: isEditing ? 'Edit' : 'New Sales Order' },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="customerId"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={customers}
                          getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                          value={customers.find(c => c.id === field.value) || null}
                          onChange={(_, value) => {
                            field.onChange(value?.id || '');
                            setSelectedCustomer(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Customer *"
                              error={!!errors.customerId}
                              helperText={errors.customerId?.message}
                              fullWidth
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="linkedQuotationId"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          options={availableQuotations}
                          getOptionLabel={(option) => 
                            typeof option === 'string' ? option : 
                            `${option.quotationNumber} - ${option.total} (${option.status})`
                          }
                          value={availableQuotations.find(q => q.id === field.value) || null}
                          onChange={(_, value) => field.onChange(value?.id || '')}
                          disabled={!watchedCustomerId}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Link Quotation (Optional)"
                              helperText="Select a quotation to link to this sales order"
                              fullWidth
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                {selectedCustomer && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Customer Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Contact:</strong> {selectedCustomer.contactPerson}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {selectedCustomer.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Phone:</strong> {selectedCustomer.phone}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Purchase Order Details */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Purchase Order Details
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="customerPONumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Customer PO Number *"
                          fullWidth
                          error={!!errors.customerPONumber}
                          helperText={errors.customerPONumber?.message}
                          placeholder="e.g., PO-ACME-2024-001"
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="poIssueDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="PO Issue Date *"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.poIssueDate,
                              helperText: errors.poIssueDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Controller
                      name="deliveryLocation"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Delivery Location *"
                          fullWidth
                          multiline
                          rows={2}
                          error={!!errors.deliveryLocation}
                          helperText={errors.deliveryLocation?.message}
                          placeholder="Enter the complete delivery address"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* File Upload */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer PO Document *
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Upload a PDF copy of the customer's purchase order. This is mandatory.
                </Typography>
                
                {!uploadedFile ? (
                  <Box
                    sx={{
                      border: 2,
                      borderColor: uploadError ? 'error.main' : 'divider',
                      borderStyle: 'dashed',
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center',
                      bgcolor: 'background.default',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Upload Customer PO
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click to browse or drag and drop your PDF file here
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                      Maximum file size: 10MB • Accepted format: PDF
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    <ListItem
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={uploadedFile.name}
                        secondary={`${formatFileSize(uploadedFile.size)} • ${uploadedFile.type}`}
                        primaryTypographyProps={{
                          sx: { display: 'flex', alignItems: 'center', gap: 1 }
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={handleRemoveFile}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                )}
                
                {uploadError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {uploadError}
                  </Alert>
                )}
                
                {errors.uploadedPOFile && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.uploadedPOFile.message}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Project Preview */}
          {projectPreview && (
            <Grid item xs={12}>
              <Card sx={{ bgcolor: 'success.50', border: 1, borderColor: 'success.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AccountTree color="success" />
                    <Typography variant="h6" color="success.main">
                      Auto-Generated Project Preview
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    A project will be automatically created when this sales order is saved:
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Project Number:</strong> {projectPreview.projectNumber}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Project Name:</strong> {projectPreview.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2">
                        <strong>Start Date:</strong> {projectPreview.startDate && formatDate(projectPreview.startDate)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {projectPreview.status?.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => setShowProjectDialog(true)}
                    sx={{ mt: 2 }}
                  >
                    View Full Project Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Notes */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Additional Notes
                </Typography>
                
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Notes"
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Any additional notes or special instructions..."
                    />
                  )}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/sales-orders')}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Sales Order & Project'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>

      {/* Project Details Dialog */}
      <Dialog
        open={showProjectDialog}
        onClose={() => setShowProjectDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Project Details Preview</DialogTitle>
        <DialogContent>
          {projectPreview && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Project Number:</strong> {projectPreview.projectNumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Project Name:</strong> {projectPreview.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Customer:</strong> {selectedCustomer?.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Status:</strong> {projectPreview.status?.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Start Date:</strong> {projectPreview.startDate && formatDate(projectPreview.startDate)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>PO Number:</strong> {projectPreview.customerPONumber}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>PO Date:</strong> {projectPreview.poIssueDate && formatDate(projectPreview.poIssueDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Delivery Location:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {projectPreview.deliveryLocation}
                  </Typography>
                </Grid>
              </Grid>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                This project will be automatically created and linked to the sales order. 
                You can manage the project details after the sales order is created.
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProjectDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesOrderForm;