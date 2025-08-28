import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  Visibility,
  Edit,
  Delete,
  AccountTree,
  Receipt,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import StatusChip from '../../common/StatusChip';
import EmptyState from '../../common/EmptyState';
import { formatDate, formatCurrency } from '../../../utils';
import { SalesOrder, SalesOrderStatus } from '../../../types';

const SalesOrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SalesOrderStatus | 'all'>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock data - replace with actual API call
  const salesOrders: SalesOrder[] = [
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      customerId: 'cust1',
      customerPONumber: 'PO-ACME-001',
      deliveryLocation: '123 Construction Site, Business City',
      poIssueDate: new Date('2024-01-10'),
      uploadedPOFile: '/uploads/po-acme-001.pdf',
      status: 'in_progress',
      linkedQuotationId: 'QUO-2024-001',
      linkedProjectId: 'PRJ-2024-001',
      lineItems: [
        {
          id: '1',
          description: '11.5 metre x 15 metre cabin',
          quantity: 1,
          unitPrice: 25000,
          taxRate: 15,
          taxAmount: 3750,
          total: 28750,
        },
      ],
      subtotal: 25000,
      taxAmount: 3750,
      total: 28750,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
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
    },
    {
      id: '2',
      orderNumber: 'SO-2024-002',
      customerId: 'cust2',
      customerPONumber: 'PO-TECH-002',
      deliveryLocation: '456 Development Area, Tech City',
      poIssueDate: new Date('2024-01-12'),
      uploadedPOFile: '/uploads/po-tech-002.pdf',
      status: 'pending',
      lineItems: [
        {
          id: '2',
          description: 'Fiberglass Toilet 1.5m x 1.5m',
          quantity: 3,
          unitPrice: 3500,
          taxRate: 15,
          taxAmount: 1575,
          total: 12075,
        },
      ],
      subtotal: 10500,
      taxAmount: 1575,
      total: 12075,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18'),
      createdBy: 'user1',
      customer: {
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
    },
  ];

  const handleCreateSalesOrder = () => {
    navigate('/sales-orders/new');
  };

  const handleViewSalesOrder = (id: string) => {
    navigate(`/sales-orders/${id}`);
  };

  const handleEditSalesOrder = (id: string) => {
    navigate(`/sales-orders/${id}/edit`);
  };

  const handleDeleteSalesOrder = (id: string) => {
    // Implement delete functionality
    console.log('Delete sales order:', id);
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateInvoice = (id: string) => {
    navigate(`/invoices/new?salesOrderId=${id}`);
  };

  const filteredSalesOrders = salesOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerPONumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: GridColDef[] = [
    {
      field: 'orderNumber',
      headerName: 'Sales Order #',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          onClick={() => handleViewSalesOrder(params.row.id)}
          sx={{ fontWeight: 600, justifyContent: 'flex-start' }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: 'customerPONumber',
      headerName: 'Customer PO #',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {params.row.customer?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.customer?.email}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'deliveryLocation',
      headerName: 'Delivery Location',
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => <StatusChip status={params.value} />,
    },
    {
      field: 'total',
      headerName: 'Total Amount',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'poIssueDate',
      headerName: 'PO Date',
      width: 120,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'linkedProjectId',
      headerName: 'Project',
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleViewProject(params.value)}
            startIcon={<AccountTree />}
          >
            View
          </Button>
        ) : (
          <Typography variant="caption" color="text.secondary">
            No Project
          </Typography>
        )
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => handleViewSalesOrder(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEditSalesOrder(params.id as string)}
          disabled={params.row.status === 'done'}
        />,
        <GridActionsCellItem
          icon={<Receipt />}
          label="Create Invoice"
          onClick={() => handleCreateInvoice(params.id as string)}
          disabled={params.row.status !== 'done'}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDeleteSalesOrder(params.id as string)}
          disabled={params.row.status === 'done'}
        />,
      ],
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Sales Orders"
        subtitle="Manage customer purchase orders and sales orders"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Sales Orders' },
        ]}
        primaryAction={{
          label: 'New Sales Order',
          onClick: handleCreateSalesOrder,
          icon: <Add />,
        }}
      >
        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            placeholder="Search sales orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Status: {statusFilter === 'all' ? 'All' : statusFilter}
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => { setStatusFilter('all'); setAnchorEl(null); }}>
              All Statuses
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('pending'); setAnchorEl(null); }}>
              Pending
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('in_progress'); setAnchorEl(null); }}>
              In Progress
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('done'); setAnchorEl(null); }}>
              Done
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('cancelled'); setAnchorEl(null); }}>
              Cancelled
            </MenuItem>
          </Menu>
        </Box>
      </PageHeader>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Sales Orders
              </Typography>
              <Typography variant="h4">
                {salesOrders.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">
                {salesOrders.filter(so => so.status === 'in_progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">
                {salesOrders.filter(so => so.status === 'done').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4">
                {formatCurrency(salesOrders.reduce((sum, so) => sum + so.total, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Grid */}
      {filteredSalesOrders.length > 0 ? (
        <Card>
          <DataGrid
            rows={filteredSalesOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: 1,
                borderColor: 'divider',
              },
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'background.default',
                borderBottom: 2,
                borderColor: 'divider',
              },
            }}
          />
        </Card>
      ) : (
        <EmptyState
          title="No sales orders found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first sales order to get started'
          }
          actionLabel={searchQuery || statusFilter !== 'all' ? undefined : 'Create Sales Order'}
          onAction={searchQuery || statusFilter !== 'all' ? undefined : handleCreateSalesOrder}
          icon={<Receipt sx={{ fontSize: 64, color: 'text.disabled' }} />}
        />
      )}
    </Box>
  );
};

export default SalesOrdersList;