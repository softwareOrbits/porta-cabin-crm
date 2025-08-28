import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const InventoryModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Inventory / Store"
        subtitle="Manage inventory and stock levels"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Inventory' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Inventory Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include inventory management and stock tracking.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InventoryModule;