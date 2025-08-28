import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const QuotationForm: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Create New Quotation"
        subtitle="Create a new quotation for your customer"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Quotations', path: '/quotations' },
          { label: 'New Quotation' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Quotation Form Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will contain a comprehensive quotation creation form with Zoho Books-like interface.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuotationForm;