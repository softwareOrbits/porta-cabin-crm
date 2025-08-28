import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const ReportsModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Reports"
        subtitle="Generate and view business reports"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Reports' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Reports Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include comprehensive business reports and analytics.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsModule;