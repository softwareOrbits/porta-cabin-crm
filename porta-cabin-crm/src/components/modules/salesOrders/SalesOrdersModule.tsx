import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const SalesOrdersModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Sales Orders"
        subtitle="Manage customer purchase orders and sales orders"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Sales Orders' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Sales Orders Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include PDF upload functionality and automatic project creation.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesOrdersModule;