import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Alert,
} from '@mui/material';
import {
  Add,
  Delete,
  Save,
  Send,
  Preview,
  Calculate,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Quotation, LineItem, Customer, QuotationStatus } from '../../../types';
import { formatCurrency, calculateTax, calculateTotal } from '../../../utils';
import { DEFAULT_TAX_RATE } from '../../../constants';

// Validation schema
const lineItemSchema = yup.object({
  description: yup.string().required('Description is required'),
  quantity: yup.number().min(0.01, 'Quantity must be greater than 0').required('Quantity is required'),
  unitPrice: yup.number().min(0, 'Unit price must be greater than or equal to 0').required('Unit price is required'),
  taxRate: yup.number().min(0).max(100).required('Tax rate is required'),
});

const quotationSchema = yup.object({
  customerId: yup.string().required('Customer is required'),
  validUntil: yup.date().min(new Date(), 'Valid until date must be in the future').required('Valid until date is required'),
  lineItems: yup.array().of(lineItemSchema).min(1, 'At least one line item is required'),
  notes: yup.string(),
  terms: yup.string(),
});

type QuotationFormData = yup.InferType<typeof quotationSchema>;

const QuotationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

  const defaultLineItem: Partial<LineItem> = {
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: DEFAULT_TAX_RATE,
    taxAmount: 0,
    total: 0,
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuotationFormData>({
    resolver: yupResolver(quotationSchema),
    defaultValues: {
      customerId: '',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      lineItems: [defaultLineItem] as LineItem[],
      notes: '',
      terms: 'Payment terms: Net 30 days\nDelivery: 2-3 weeks from order confirmation',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems',
  });

  const watchedLineItems = watch('lineItems');

  // Calculate totals
  const calculateLineItemTotals = (lineItem: Partial<LineItem>, index: number) => {
    const quantity = lineItem.quantity || 0;
    const unitPrice = lineItem.unitPrice || 0;
    const taxRate = lineItem.taxRate || 0;
    
    const subtotal = quantity * unitPrice;
    const taxAmount = calculateTax(subtotal, taxRate);
    const total = calculateTotal(subtotal, taxAmount);

    setValue(`lineItems.${index}.taxAmount`, Number(taxAmount.toFixed(2)));
    setValue(`lineItems.${index}.total`, Number(total.toFixed(2)));
  };

  // Watch for changes in line items and recalculate
  useEffect(() => {
    watchedLineItems.forEach((lineItem, index) => {
      calculateLineItemTotals(lineItem, index);
    });
  }, [watchedLineItems, setValue]);

  const getQuotationTotals = () => {
    const subtotal = watchedLineItems.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const unitPrice = item.unitPrice || 0;
      return sum + (quantity * unitPrice);
    }, 0);

    const taxAmount = watchedLineItems.reduce((sum, item) => {
      return sum + (item.taxAmount || 0);
    }, 0);

    const total = subtotal + taxAmount;

    return { subtotal, taxAmount, total };
  };

  const { subtotal, taxAmount, total } = getQuotationTotals();

  const addLineItem = () => {
    append(defaultLineItem as LineItem);
  };

  const removeLineItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: QuotationFormData, status: QuotationStatus = 'draft') => {
    try {
      setIsLoading(true);

      // Calculate final totals
      const finalTotals = getQuotationTotals();
      
      const quotationData: Partial<Quotation> = {
        ...data,
        status,
        subtotal: finalTotals.subtotal,
        taxAmount: finalTotals.taxAmount,
        total: finalTotals.total,
        isAccepted: false,
        quotationNumber: isEditing ? undefined : `QUO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      };

      // TODO: Replace with actual API call
      console.log('Saving quotation:', quotationData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/quotations');
    } catch (error) {
      console.error('Error saving quotation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = (data: QuotationFormData) => {
    onSubmit(data, 'draft');
  };

  const handleSendQuotation = (data: QuotationFormData) => {
    onSubmit(data, 'sent');
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Saving quotation..." />;
  }

  return (
    <Box>
      <PageHeader
        title={isEditing ? 'Edit Quotation' : 'Create New Quotation'}
        subtitle="Create a professional quotation for your customer"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Quotations', path: '/quotations' },
          { label: isEditing ? 'Edit' : 'New Quotation' },
        ]}
      />

      <form>
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
                      name="validUntil"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Valid Until *"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.validUntil,
                              helperText: errors.validUntil?.message,
                            },
                          }}
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
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {selectedCustomer.address.street}, {selectedCustomer.address.city}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Line Items */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Line Items
                  </Typography>
                  <Button
                    startIcon={<Add />}
                    onClick={addLineItem}
                    variant="outlined"
                    size="small"
                  >
                    Add Item
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ minWidth: 300 }}>Description *</TableCell>
                        <TableCell sx={{ width: 120 }}>Qty *</TableCell>
                        <TableCell sx={{ width: 150 }}>Unit Price *</TableCell>
                        <TableCell sx={{ width: 120 }}>Tax Rate %</TableCell>
                        <TableCell sx={{ width: 150 }}>Tax Amount</TableCell>
                        <TableCell sx={{ width: 150 }}>Total</TableCell>
                        <TableCell sx={{ width: 60 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell>
                            <Controller
                              name={`lineItems.${index}.description`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  placeholder="e.g., 11.5 metre x 15 metre cabin"
                                  size="small"
                                  fullWidth
                                  error={!!errors.lineItems?.[index]?.description}
                                  helperText={errors.lineItems?.[index]?.description?.message}
                                />
                              )}
                            />
                          </TableCell>
                          
                          <TableCell>
                            <Controller
                              name={`lineItems.${index}.quantity`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  inputProps={{ min: 0, step: 0.01 }}
                                  error={!!errors.lineItems?.[index]?.quantity}
                                />
                              )}
                            />
                          </TableCell>
                          
                          <TableCell>
                            <Controller
                              name={`lineItems.${index}.unitPrice`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  inputProps={{ min: 0, step: 0.01 }}
                                  error={!!errors.lineItems?.[index]?.unitPrice}
                                />
                              )}
                            />
                          </TableCell>
                          
                          <TableCell>
                            <Controller
                              name={`lineItems.${index}.taxRate`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  inputProps={{ min: 0, max: 100, step: 0.01 }}
                                  error={!!errors.lineItems?.[index]?.taxRate}
                                />
                              )}
                            />
                          </TableCell>
                          
                          <TableCell>
                            <Typography variant="body2">
                              {formatCurrency(watchedLineItems[index]?.taxAmount || 0)}
                            </Typography>
                          </TableCell>
                          
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {formatCurrency(watchedLineItems[index]?.total || 0)}
                            </Typography>
                          </TableCell>
                          
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeLineItem(index)}
                              disabled={fields.length === 1}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {errors.lineItems && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.lineItems.message || 'Please fix the errors in line items'}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Totals Summary */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notes & Terms
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
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
                          placeholder="Additional notes for the customer..."
                        />
                      )}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="terms"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Terms & Conditions"
                          multiline
                          rows={4}
                          fullWidth
                          placeholder="Payment and delivery terms..."
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax:</Typography>
                  <Typography variant="body2">{formatCurrency(taxAmount)}</Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">{formatCurrency(total)}</Typography>
                </Box>
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
                    onClick={() => navigate('/quotations')}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<Save />}
                    onClick={handleSubmit(handleSaveDraft)}
                    disabled={isSubmitting}
                  >
                    Save as Draft
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={handleSubmit(handleSendQuotation)}
                    disabled={isSubmitting}
                  >
                    Send Quotation
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default QuotationForm;