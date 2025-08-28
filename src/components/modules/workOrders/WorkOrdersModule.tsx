import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const WorkOrdersModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Work Orders"
        subtitle="Manage work orders and project drawings"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Work Orders' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Work Orders Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include drawings upload and work order management.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkOrdersModule;