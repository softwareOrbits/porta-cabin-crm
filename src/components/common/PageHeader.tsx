import React from 'react';
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Paper,
} from '@mui/material';
import { NavigateNext, Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactElement;
    disabled?: boolean;
  };
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions = [],
  primaryAction,
  children,
}) => {

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            if (isLast || !crumb.path) {
              return (
                <Typography
                  key={index}
                  color={isLast ? 'text.primary' : 'text.secondary'}
                  variant="body2"
                >
                  {crumb.label}
                </Typography>
              );
            }

            return (
              <Link
                key={index}
                component={RouterLink}
                to={crumb.path}
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* Header Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Title and Subtitle */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              mb: subtitle ? 1 : 0,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.5 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {action}
            </React.Fragment>
          ))}
          
          {primaryAction && (
            <Button
              variant="contained"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
              startIcon={primaryAction.icon || <Add />}
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              {primaryAction.label}
            </Button>
          )}
        </Box>
      </Box>

      {/* Additional Content */}
      {children && (
        <Box sx={{ mt: 3 }}>
          {children}
        </Box>
      )}
    </Paper>
  );
};

export default PageHeader;