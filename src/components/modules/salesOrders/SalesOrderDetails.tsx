import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Edit,
  Delete,
  AccountTree,
  Receipt,
  PictureAsPdf,
  Download,
  Visibility,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import StatusChip from '../../common/StatusChip';
import LoadingSpinner from '../../common/LoadingSpinner';
import { SalesOrder, Project } from '../../../types';
import { formatDate, formatCurrency } from '../../../utils';

const SalesOrderDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [salesOrder, setSalesOrder] = useState<SalesOrder | null>(null);
  const [linkedProject, setLinkedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [markDoneDialogOpen, setMarkDoneDialogOpen] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock sales order data
        const mockSalesOrder: SalesOrder = {
          id: id || '1',
          orderNumber: 'SO-2024-001',
          customerId: 'cust1',
          customerPONumber: 'PO-ACME-001',
          deliveryLocation: '123 Construction Site, Business City, State 12345',
          poIssueDate: new Date('2024-01-10'),
          uploadedPOFile: '/uploads/po-acme-001.pdf',
          status: 'in_progress',
          linkedQuotationId: 'QUO-2024-001',
          linkedProjectId: 'PRJ-2024-001',
          lineItems: [
            {
              id: '1',
              description: '11.5 metre x 15 metre cabin with standard fittings',
              quantity: 1,
              unitPrice: 25000,
              taxRate: 15,
              taxAmount: 3750,
              total: 28750,
            },
            {
              id: '2',
              description: 'Transportation and installation charges',
              quantity: 1,
              unitPrice: 2500,
              taxRate: 15,
              taxAmount: 375,
              total: 2875,
            },
          ],
          subtotal: 27500,
          taxAmount: 4125,
          total: 31625,
          notes: 'Special delivery instructions: Access road is narrow, use smaller truck.',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-18'),
          createdBy: 'user1',
          customer: {
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
        };
        
        setSalesOrder(mockSalesOrder);

        // Mock linked project data
        if (mockSalesOrder.linkedProjectId) {
          const mockProject: Project = {
            id: 'PRJ-2024-001',
            projectNumber: 'PRJ-2024-001',
            name: 'Acme Corporation - PO-ACME-001',
            customerId: 'cust1',
            salesOrderId: id || '1',
            status: 'in_progress',
            startDate: new Date('2024-01-10'),
            deliveryLocation: mockSalesOrder.deliveryLocation,
            customerPONumber: mockSalesOrder.customerPONumber,
            poIssueDate: mockSalesOrder.poIssueDate,
            attachments: [mockSalesOrder.uploadedPOFile],
            workOrders: [],
            expenses: [],
            laborAssignments: [],
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-18'),
            createdBy: 'user1',
          };
          setLinkedProject(mockProject);
        }
      } catch (error) {
        console.error('Error fetching sales order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSalesOrder();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/sales-orders/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/sales-orders');
    } catch (error) {
      console.error('Error deleting sales order:', error);
    } finally {
      setActionLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleMarkDone = async () => {
    try {
      setActionLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (salesOrder) {
        setSalesOrder({
          ...salesOrder,
          status: 'done',
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(false);
      setMarkDoneDialogOpen(false);
    }
  };

  const handleViewProject = () => {
    if (linkedProject) {
      navigate(`/projects/${linkedProject.id}`);
    }
  };

  const handleCreateInvoice = () => {
    navigate(`/invoices/new?salesOrderId=${id}`);
  };

  const handleDownloadPO = () => {
    // TODO: Implement file download
    console.log('Download PO file');
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Loading sales order..." />;
  }

  if (!salesOrder) {
    return (
      <Box>
        <Alert severity="error">
          Sales order not found.
        </Alert>
      </Box>
    );
  }

  const canEdit = salesOrder.status !== 'done' && salesOrder.status !== 'cancelled';
  const canMarkDone = salesOrder.status === 'in_progress';
  const canCreateInvoice = salesOrder.status === 'done';

  return (
    <Box>
      <PageHeader
        title={`Sales Order ${salesOrder.orderNumber}`}
        subtitle={`Created on ${formatDate(salesOrder.createdAt)}`}
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Sales Orders', path: '/sales-orders' },
          { label: salesOrder.orderNumber },
        ]}
        actions={[
          ...(canMarkDone ? [
            <Button
              key="mark-done"
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => setMarkDoneDialogOpen(true)}
            >
              Mark as Done
            </Button>
          ] : []),
          ...(canCreateInvoice ? [
            <Button
              key="create-invoice"
              variant="contained"
              startIcon={<Receipt />}
              onClick={handleCreateInvoice}
            >
              Create Invoice
            </Button>
          ] : []),
        ]}
        primaryAction={{
          label: canEdit ? 'Edit' : 'View Only',
          onClick: handleEdit,
          icon: canEdit ? <Edit /> : <Visibility />,
          disabled: !canEdit,
        }}
      />

      <Grid container spacing={3}>
        {/* Sales Order Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom>
                    {salesOrder.orderNumber}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <StatusChip status={salesOrder.status} />
                    {salesOrder.linkedQuotationId && (
                      <Chip
                        label={`Linked to ${salesOrder.linkedQuotationId}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Customer PO: {salesOrder.customerPONumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    PO Date: {formatDate(salesOrder.poIssueDate)}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {formatCurrency(salesOrder.total)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {formatDate(salesOrder.createdAt)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated: {formatDate(salesOrder.updatedAt)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer & Delivery Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {salesOrder.customer?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {salesOrder.customer?.contactPerson}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {salesOrder.customer?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {salesOrder.customer?.phone}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Information
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Delivery Location:</strong>
                </Typography>
                <Typography variant="body2">
                  {salesOrder.deliveryLocation}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer PO Document */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer PO Document
              </Typography>
              
              <List>
                <ListItem
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdf color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Customer Purchase Order"
                    secondary={salesOrder.uploadedPOFile}
                  />
                  <IconButton onClick={handleDownloadPO} color="primary">
                    <Download />
                  </IconButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Linked Project */}
        {linkedProject && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Linked Project
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {linkedProject.projectNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {linkedProject.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <StatusChip status={linkedProject.status} />
                    <Typography variant="caption" color="text.secondary">
                      Started: {formatDate(linkedProject.startDate)}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AccountTree />}
                    onClick={handleViewProject}
                    sx={{ mt: 2 }}
                  >
                    View Project
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Line Items */}
        {salesOrder.lineItems.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                
                <List>
                  {salesOrder.lineItems.map((item, index) => (
                    <React.Fragment key={item.id || index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={item.description}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                              <Typography variant="caption">
                                Qty: {item.quantity}
                              </Typography>
                              <Typography variant="caption">
                                Unit Price: {formatCurrency(item.unitPrice)}
                              </Typography>
                              <Typography variant="caption">
                                Tax: {item.taxRate}%
                              </Typography>
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                Total: {formatCurrency(item.total)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < salesOrder.lineItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ minWidth: 200 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Subtotal:</Typography>
                      <Typography variant="body2">{formatCurrency(salesOrder.subtotal)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Tax:</Typography>
                      <Typography variant="body2">{formatCurrency(salesOrder.taxAmount)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary">
                        {formatCurrency(salesOrder.total)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Notes */}
        {salesOrder.notes && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {salesOrder.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {canEdit && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Sales Order</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this sales order? This action cannot be undone.
          {linkedProject && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This will also affect the linked project: {linkedProject.projectNumber}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            disabled={actionLoading}
          >
            {actionLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mark Done Confirmation Dialog */}
      <Dialog open={markDoneDialogOpen} onClose={() => setMarkDoneDialogOpen(false)}>
        <DialogTitle>Mark Sales Order as Done</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Mark this sales order as completed?
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            Once marked as done, you'll be able to create invoices for this sales order.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMarkDoneDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleMarkDone} 
            variant="contained"
            color="success"
            disabled={actionLoading}
            startIcon={<CheckCircle />}
          >
            {actionLoading ? 'Updating...' : 'Mark as Done'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesOrderDetails;