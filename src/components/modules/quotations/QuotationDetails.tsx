import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit,
  Send,
  FileCopy,
  Delete,
  Download,
  MoreVert,
  Email,
  Print,
  CheckCircle,
  Cancel,
  Visibility,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import StatusChip from '../../common/StatusChip';
import LoadingSpinner from '../../common/LoadingSpinner';
import { Quotation, QuotationStatus } from '../../../types';
import { formatDate, formatCurrency } from '../../../utils';

const QuotationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock quotation data
        const mockQuotation: Quotation = {
          id: id || '1',
          quotationNumber: 'QUO-2024-001',
          customerId: 'cust1',
          status: 'sent',
          validUntil: new Date('2024-02-15'),
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
              description: 'Fiberglass Toilet 1.5m x 1.5m',
              quantity: 2,
              unitPrice: 3500,
              taxRate: 15,
              taxAmount: 1050,
              total: 8050,
            },
            {
              id: '3',
              description: 'Transportation and installation charges',
              quantity: 1,
              unitPrice: 2500,
              taxRate: 15,
              taxAmount: 375,
              total: 2875,
            },
          ],
          subtotal: 31000,
          taxAmount: 5175,
          total: 36175,
          isAccepted: false,
          notes: 'All prices include standard specifications. Custom modifications may affect pricing.',
          terms: 'Payment terms: 50% advance, 50% on delivery\nDelivery: 2-3 weeks from order confirmation\nWarranty: 12 months on manufacturing defects',
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
        
        setQuotation(mockQuotation);
      } catch (error) {
        console.error('Error fetching quotation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchQuotation();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/quotations/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/quotations');
    } catch (error) {
      console.error('Error deleting quotation:', error);
    } finally {
      setActionLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleSendQuotation = async () => {
    try {
      setActionLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (quotation) {
        setQuotation({
          ...quotation,
          status: 'sent' as QuotationStatus,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error sending quotation:', error);
    } finally {
      setActionLoading(false);
      setSendDialogOpen(false);
    }
  };

  const handleDuplicate = () => {
    navigate('/quotations/new', { 
      state: { duplicateFrom: quotation } 
    });
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation and download
    console.log('Download PDF');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = async (newStatus: QuotationStatus) => {
    try {
      setActionLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (quotation) {
        setQuotation({
          ...quotation,
          status: newStatus,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(false);
      setAnchorEl(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Loading quotation..." />;
  }

  if (!quotation) {
    return (
      <Box>
        <Alert severity="error">
          Quotation not found.
        </Alert>
      </Box>
    );
  }

  const canEdit = quotation.status === 'draft';
  const canSend = quotation.status === 'draft';
  const canDelete = quotation.status === 'draft' || quotation.status === 'rejected';

  return (
    <Box>
      <PageHeader
        title={`Quotation ${quotation.quotationNumber}`}
        subtitle={`Created on ${formatDate(quotation.createdAt)}`}
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Quotations', path: '/quotations' },
          { label: quotation.quotationNumber },
        ]}
        actions={[
          <Button
            key="more"
            variant="outlined"
            endIcon={<MoreVert />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            More Actions
          </Button>
        ]}
        primaryAction={{
          label: canEdit ? 'Edit' : 'View Only',
          onClick: handleEdit,
          icon: canEdit ? <Edit /> : <Visibility />,
          disabled: !canEdit,
        }}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {canSend && (
          <MenuItem onClick={() => setSendDialogOpen(true)}>
            <ListItemIcon><Send /></ListItemIcon>
            <ListItemText>Send to Customer</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon><FileCopy /></ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleDownloadPDF}>
          <ListItemIcon><Download /></ListItemIcon>
          <ListItemText>Download PDF</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handlePrint}>
          <ListItemIcon><Print /></ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
        
        <Divider />
        
        {quotation.status === 'sent' && (
          <MenuItem onClick={() => handleStatusChange('accepted')}>
            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
            <ListItemText>Mark as Accepted</ListItemText>
          </MenuItem>
        )}
        
        {quotation.status === 'sent' && (
          <MenuItem onClick={() => handleStatusChange('rejected')}>
            <ListItemIcon><Cancel color="error" /></ListItemIcon>
            <ListItemText>Mark as Rejected</ListItemText>
          </MenuItem>
        )}
        
        {canDelete && (
          <>
            <Divider />
            <MenuItem onClick={() => setDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>
              <ListItemIcon><Delete color="error" /></ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

      <Grid container spacing={3}>
        {/* Quotation Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom>
                    {quotation.quotationNumber}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <StatusChip status={quotation.status} />
                    <Typography variant="body2" color="text.secondary">
                      Valid until: {formatDate(quotation.validUntil)}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {formatCurrency(quotation.total)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {formatDate(quotation.createdAt)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated: {formatDate(quotation.updatedAt)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {quotation.customer?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {quotation.customer?.contactPerson}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {quotation.customer?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {quotation.customer?.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {quotation.customer?.address.street}<br />
                  {quotation.customer?.address.city}, {quotation.customer?.address.state} {quotation.customer?.address.zipCode}<br />
                  {quotation.customer?.address.country}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">{formatCurrency(quotation.subtotal)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax:</Typography>
                  <Typography variant="body2">{formatCurrency(quotation.taxAmount)}</Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(quotation.total)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Items */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Line Items
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Tax Rate</TableCell>
                      <TableCell align="right">Tax Amount</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quotation.lineItems.map((item, index) => (
                      <TableRow key={item.id || index}>
                        <TableCell>
                          <Typography variant="body2">
                            {item.description}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {item.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {item.taxRate}%
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(item.taxAmount)}
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {formatCurrency(item.total)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Notes and Terms */}
        {(quotation.notes || quotation.terms) && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Additional Information
                </Typography>
                
                <Grid container spacing={3}>
                  {quotation.notes && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Notes
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        {quotation.notes}
                      </Typography>
                    </Grid>
                  )}
                  
                  {quotation.terms && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Terms & Conditions
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ whiteSpace: 'pre-line' }}
                      >
                        {quotation.terms}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Quotation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this quotation? This action cannot be undone.
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

      {/* Send Confirmation Dialog */}
      <Dialog open={sendDialogOpen} onClose={() => setSendDialogOpen(false)}>
        <DialogTitle>Send Quotation</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Send this quotation to {quotation.customer?.name}?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The quotation will be sent to: {quotation.customer?.email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSendQuotation} 
            variant="contained"
            disabled={actionLoading}
            startIcon={<Send />}
          >
            {actionLoading ? 'Sending...' : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuotationDetails;