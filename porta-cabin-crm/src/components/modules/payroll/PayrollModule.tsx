import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const PayrollModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Payroll & HR"
        subtitle="Manage employee payroll and attendance"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Payroll & HR' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Payroll & HR Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include employee management, attendance tracking, and payroll processing.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PayrollModule;