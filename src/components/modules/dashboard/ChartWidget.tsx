import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { formatCurrency } from '../../../utils';

interface ChartWidgetProps {
  data: any[];
  dataKey: string;
  name: string;
  color: string;
  type?: 'area' | 'bar' | 'line';
  height?: number;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  data,
  dataKey,
  name,
  color,
  type = 'area',
  height = 320,
}) => {
  // const theme = useTheme();

  // Simple chart implementation without heavy recharts dependency
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  const minValue = Math.min(...data.map(item => item[dataKey]));

  return (
    <Box sx={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {name} Chart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chart visualization coming soon
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Max Value
            </Typography>
            <Typography variant="h6" color={color}>
              {dataKey === 'revenue' ? formatCurrency(maxValue) : maxValue}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Min Value
            </Typography>
            <Typography variant="h6" color={color}>
              {dataKey === 'revenue' ? formatCurrency(minValue) : minValue}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartWidget;