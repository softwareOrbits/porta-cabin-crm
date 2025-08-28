import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  Add,
  Search,
  Inbox,
} from '@mui/icons-material';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactElement;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactElement;
  variant?: 'default' | 'search' | 'error';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  actionIcon = <Add />,
  variant = 'default',
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search sx={{ fontSize: 64, color: 'text.disabled' }} />;
      case 'error':
        return <Inbox sx={{ fontSize: 64, color: 'error.main' }} />;
      default:
        return <Inbox sx={{ fontSize: 64, color: 'text.disabled' }} />;
    }
  };

  const displayIcon = icon || getDefaultIcon();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderStyle: 'dashed',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {displayIcon}
        
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 400, lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )}
        
        {actionLabel && onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            startIcon={actionIcon}
            sx={{ mt: 1 }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default EmptyState;