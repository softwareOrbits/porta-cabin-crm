import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import PageHeader from '../../common/PageHeader';

const ProjectsModule: React.FC = () => {
  return (
    <Box>
      <PageHeader
        title="Projects"
        subtitle="Manage and track project progress"
        breadcrumbs={[
          { label: 'Home', path: '/dashboard' },
          { label: 'Projects' },
        ]}
      />
      
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Projects Module Coming Soon
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            This will include project status tracking and management.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectsModule;