import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  Add,
  Description,
  ReceiptLong,
  AccountTree,
  Engineering,
  Receipt,
  Groups,
  Hardware,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const quickActions = [
    {
      title: 'New Quotation',
      description: 'Create a new quotation for a customer',
      icon: <Description />,
      action: () => navigate('/quotations/new'),
      permission: { module: 'quotations', action: 'create' },
    },
    {
      title: 'New Sales Order',
      description: 'Create a new sales order',
      icon: <ReceiptLong />,
      action: () => navigate('/sales-orders/new'),
      permission: { module: 'sales_orders', action: 'create' },
    },
    {
      title: 'New Project',
      description: 'Start a new project',
      icon: <AccountTree />,
      action: () => navigate('/projects/new'),
      permission: { module: 'projects', action: 'create' },
    },
    {
      title: 'New Work Order',
      description: 'Create a new work order',
      icon: <Engineering />,
      action: () => navigate('/work-orders/new'),
      permission: { module: 'work_orders', action: 'create' },
    },
    {
      title: 'New Invoice',
      description: 'Generate a new invoice',
      icon: <Receipt />,
      action: () => navigate('/invoices/new'),
      permission: { module: 'invoices', action: 'create' },
    },
    {
      title: 'Add Employee',
      description: 'Add a new employee to payroll',
      icon: <Groups />,
      action: () => navigate('/payroll/employees/new'),
      permission: { module: 'payroll', action: 'create' },
    },
    {
      title: 'Add Asset',
      description: 'Register a new company asset',
      icon: <Hardware />,
      action: () => navigate('/assets/new'),
      permission: { module: 'assets', action: 'create' },
    },
  ];

  const availableActions = quickActions.filter(action => 
    hasPermission(action.permission.module, action.permission.action)
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Common tasks to get you started
        </Typography>

        <List sx={{ py: 0 }}>
          {availableActions.map((action, index) => (
            <React.Fragment key={action.title}>
              <ListItemButton
                onClick={action.action}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  px: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'primary.main',
                    minWidth: 40,
                  }}
                >
                  {action.icon}
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      {action.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ lineHeight: 1.3 }}
                    >
                      {action.description}
                    </Typography>
                  }
                />
                
                <Add
                  sx={{
                    color: 'text.disabled',
                    fontSize: 16,
                  }}
                />
              </ListItemButton>
              
              {index < availableActions.length - 1 && (
                <Divider sx={{ my: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </List>

        {availableActions.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 3,
              color: 'text.secondary',
            }}
          >
            <Add sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">
              No quick actions available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActions;