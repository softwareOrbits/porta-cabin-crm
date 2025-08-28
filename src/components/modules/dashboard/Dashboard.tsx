import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import {

  Description,
  AccountTree,
  Receipt,
  AttachMoney,

} from '@mui/icons-material';
import PageHeader from '../../common/PageHeader';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import QuickActions from './QuickActions';
import ChartWidget from './ChartWidget';
import { useAuth } from '../../../context/AuthContext';
import { formatCurrency } from '../../../utils';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  // Mock data - replace with actual data from API
  const stats = [
    {
      title: 'Total Quotations',
      value: 45,
      change: 12,
      icon: <Description />,
      color: theme.palette.primary.main,
      trend: 'up' as const,
    },
    {
      title: 'Active Projects',
      value: 8,
      change: 2,
      icon: <AccountTree />,
      color: theme.palette.success.main,
      trend: 'up' as const,
    },
    {
      title: 'Pending Invoices',
      value: 12,
      change: -3,
      icon: <Receipt />,
      color: theme.palette.warning.main,
      trend: 'down' as const,
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(125000),
      change: 15,
      icon: <AttachMoney />,
      color: theme.palette.info.main,
      trend: 'up' as const,
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'quotation',
      description: 'New quotation created for Acme Corp',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      userId: user?.id || '',
      userName: `${user?.firstName} ${user?.lastName}`,
    },
    {
      id: '2',
      type: 'project',
      description: 'Project PRJ-001 status updated to In Progress',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      userId: user?.id || '',
      userName: 'John Smith',
    },
    {
      id: '3',
      type: 'invoice',
      description: 'Invoice INV-2024-001 payment received',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userId: user?.id || '',
      userName: 'Sarah Johnson',
    },
    {
      id: '4',
      type: 'sales_order',
      description: 'New sales order SO-2024-015 created',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userId: user?.id || '',
      userName: 'Mike Davis',
    },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 85000, projects: 5 },
    { month: 'Feb', revenue: 92000, projects: 7 },
    { month: 'Mar', revenue: 78000, projects: 4 },
    { month: 'Apr', revenue: 105000, projects: 8 },
    { month: 'May', revenue: 125000, projects: 12 },
    { month: 'Jun', revenue: 110000, projects: 9 },
  ];

  return (
    <Box>
      <PageHeader
        title={`Welcome back, ${user?.firstName}!`}
        subtitle="Here's what's happening with your business today."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Dashboard' },
        ]}
      />

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}

        {/* Charts Row */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Overview
              </Typography>
              <ChartWidget
                data={monthlyData}
                dataKey="revenue"
                name="Revenue"
                color={theme.palette.primary.main}
                type="area"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Status
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mt: 2,
                }}
              >
                {[
                  { label: 'Completed', value: 15, color: theme.palette.success.main },
                  { label: 'In Progress', value: 8, color: theme.palette.warning.main },
                  { label: 'On Hold', value: 3, color: theme.palette.error.main },
                  { label: 'Planning', value: 5, color: theme.palette.info.main },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                        }}
                      />
                      <Typography variant="body2">{item.label}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <QuickActions />
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <RecentActivities activities={recentActivities} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;