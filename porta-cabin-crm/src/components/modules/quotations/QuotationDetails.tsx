import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const QuotationDetails: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Quotation Details"
        subtitle="View and manage quotation details"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Quotations', path: '/quotations' },
          { label: 'Details' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Quotation Details Coming Soon
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuotationDetails;