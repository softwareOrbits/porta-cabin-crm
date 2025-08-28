import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Chip,
  Button,
} from '@mui/material';
import {
  Description,
  AccountTree,
  Receipt,
  ReceiptLong,
  Handyman,
  Timeline,
  ArrowForward,
} from '@mui/icons-material';
import { formatDateTime } from '../../../utils';
import { ActivityItem } from '../../../types';

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quotation':
        return <Description />;
      case 'project':
        return <AccountTree />;
      case 'invoice':
        return <Receipt />;
      case 'sales_order':
        return <ReceiptLong />;
      case 'work_order':
        return <Handyman />;
      default:
        return <Timeline />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'quotation':
        return '#2196F3';
      case 'project':
        return '#4CAF50';
      case 'invoice':
        return '#FF9800';
      case 'sales_order':
        return '#9C27B0';
      case 'work_order':
        return '#795548';
      default:
        return '#607D8B';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'quotation':
        return 'Quotation';
      case 'project':
        return 'Project';
      case 'invoice':
        return 'Invoice';
      case 'sales_order':
        return 'Sales Order';
      case 'work_order':
        return 'Work Order';
      default:
        return 'Activity';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">
            Recent Activities
          </Typography>
          <Button
            size="small"
            endIcon={<ArrowForward />}
            onClick={() => {
              // Navigate to full activity log
              console.log('View all activities');
            }}
          >
            View All
          </Button>
        </Box>

        {activities.length > 0 ? (
          <List sx={{ py: 0 }}>
            {activities.map((activity, index) => (
              <ListItem
                key={activity.id}
                sx={{
                  px: 0,
                  py: 1.5,
                  borderBottom: index < activities.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getActivityColor(activity.type)}20`,
                      color: getActivityColor(activity.type),
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        {activity.description}
                      </Typography>
                      <Chip
                        label={getActivityTypeLabel(activity.type)}
                        size="small"
                        sx={{
                          bgcolor: `${getActivityColor(activity.type)}20`,
                          color: getActivityColor(activity.type),
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 0.5,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        by {activity.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                      >
                        {formatDateTime(activity.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            <Timeline sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">
              No recent activities
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;