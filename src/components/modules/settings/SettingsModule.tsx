import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const SettingsModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Configure system settings and preferences"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Settings' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Settings Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include user management and system configuration.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsModule;