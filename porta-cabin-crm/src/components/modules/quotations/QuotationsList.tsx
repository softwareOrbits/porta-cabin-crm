import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Add,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Visibility,
  Delete,
  Send,
  FileCopy,
  Description,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../common/PageHeader';
import StatusChip from '../../common/StatusChip';
import EmptyState from '../../common/EmptyState';
import { formatDate, formatCurrency } from '../../../utils';
import { Quotation, QuotationStatus } from '../../../types';

const QuotationsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | 'all'>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock data - replace with actual API call
  const quotations: Quotation[] = [
    {
      id: '1',
      quotationNumber: 'QUO-2024-001',
      customerId: 'cust1',
      status: 'sent',
      validUntil: new Date('2024-02-15'),
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
      isAccepted: false,
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
      quotationNumber: 'QUO-2024-002',
      customerId: 'cust2',
      status: 'draft',
      validUntil: new Date('2024-02-20'),
      lineItems: [
        {
          id: '2',
          description: 'Fiberglass Toilet 1.5m x 1.5m',
          quantity: 2,
          unitPrice: 3500,
          taxRate: 15,
          taxAmount: 1050,
          total: 8050,
        },
      ],
      subtotal: 7000,
      taxAmount: 1050,
      total: 8050,
      isAccepted: false,
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

  const handleCreateQuotation = () => {
    navigate('/quotations/new');
  };

  const handleViewQuotation = (id: string) => {
    navigate(`/quotations/${id}`);
  };

  const handleEditQuotation = (id: string) => {
    navigate(`/quotations/${id}/edit`);
  };

  const handleDeleteQuotation = (id: string) => {
    // Implement delete functionality
    console.log('Delete quotation:', id);
  };

  const handleSendQuotation = (id: string) => {
    // Implement send functionality
    console.log('Send quotation:', id);
  };

  const handleDuplicateQuotation = (id: string) => {
    // Implement duplicate functionality
    console.log('Duplicate quotation:', id);
  };

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quotation.customer?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: GridColDef[] = [
    {
      field: 'quotationNumber',
      headerName: 'Quotation #',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="text"
          onClick={() => handleViewQuotation(params.row.id)}
          sx={{ fontWeight: 600, justifyContent: 'flex-start' }}
        >
          {params.value}
        </Button>
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
      field: 'validUntil',
      headerName: 'Valid Until',
      width: 120,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View"
          onClick={() => handleViewQuotation(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEditQuotation(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<Send />}
          label="Send"
          onClick={() => handleSendQuotation(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<FileCopy />}
          label="Duplicate"
          onClick={() => handleDuplicateQuotation(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDeleteQuotation(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Quotations"
        subtitle="Manage customer quotations and proposals"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Quotations' },
        ]}
        primaryAction={{
          label: 'New Quotation',
          onClick: handleCreateQuotation,
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
            placeholder="Search quotations..."
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
            <MenuItem onClick={() => { setStatusFilter('draft'); setAnchorEl(null); }}>
              Draft
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('sent'); setAnchorEl(null); }}>
              Sent
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('accepted'); setAnchorEl(null); }}>
              Accepted
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('rejected'); setAnchorEl(null); }}>
              Rejected
            </MenuItem>
            <MenuItem onClick={() => { setStatusFilter('expired'); setAnchorEl(null); }}>
              Expired
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
                Total Quotations
              </Typography>
              <Typography variant="h4">
                {quotations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Sent Quotations
              </Typography>
              <Typography variant="h4">
                {quotations.filter(q => q.status === 'sent').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Accepted
              </Typography>
              <Typography variant="h4">
                {quotations.filter(q => q.status === 'accepted').length}
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
                {formatCurrency(quotations.reduce((sum, q) => sum + q.total, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Grid */}
      {filteredQuotations.length > 0 ? (
        <Card>
          <DataGrid
            rows={filteredQuotations}
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
          title="No quotations found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first quotation to get started'
          }
          actionLabel={searchQuery || statusFilter !== 'all' ? undefined : 'Create Quotation'}
          onAction={searchQuery || statusFilter !== 'all' ? undefined : handleCreateQuotation}
          icon={<Description sx={{ fontSize: 64, color: 'text.disabled' }} />}
        />
      )}
    </Box>
  );
};

export default QuotationsList;