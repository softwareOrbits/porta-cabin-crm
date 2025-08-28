import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const ContractorsModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Contractors"
        subtitle="Manage contractors and payments"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Contractors' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Contractors Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include contractor management and payment approval system.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContractorsModule;