import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const AssetsModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Assets"
        subtitle="Manage company assets and depreciation"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Assets' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Assets Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include asset management with barcode generation and depreciation tracking.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssetsModule;