import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const InvoicesModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Invoices"
        subtitle="Manage proforma and tax invoices"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Invoices' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Invoices Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include proforma and tax invoice management with ZED portal integration.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InvoicesModule;