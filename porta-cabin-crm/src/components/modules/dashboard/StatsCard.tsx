import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactElement;
  color: string;
  trend: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  trend,
}) => {
  const theme = useTheme();

  const isPositive = change >= 0;
  const changeColor = isPositive ? theme.palette.success.main : theme.palette.error.main;
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {/* Background Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          opacity: 0.1,
          transform: 'scale(2.5)',
          color: color,
        }}
      >
        {React.cloneElement(icon, { fontSize: 'large' })}
      </Box>

      <CardContent sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: `${color}20`,
              color: color,
            }}
          >
            {React.cloneElement(icon, { fontSize: 'medium' })}
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: changeColor,
            }}
          >
            <TrendIcon fontSize="small" />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: changeColor,
              }}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
        </Box>

        {/* Value */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          {value}
        </Typography>

        {/* Title */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>

        {/* Change Description */}
        <Typography
          variant="caption"
          sx={{
            color: changeColor,
            mt: 1,
            display: 'block',
            fontWeight: 500,
          }}
        >
          {isPositive ? '+' : ''}{change}% from last month
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;