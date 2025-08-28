import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { STATUS_COLORS } from '../../constants';
import { getStatusColor, getStatusLabel } from '../../utils';

interface StatusChipProps extends Omit<ChipProps, 'label'> {
  status: string;
  customColors?: Record<string, string>;
}

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  customColors,
  sx,
  ...props
}) => {
  const statusColors = customColors || STATUS_COLORS;
  const color = getStatusColor(status, statusColors);
  const label = getStatusLabel(status);

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: `${color}20`,
        color: color,
        borderColor: `${color}40`,
        fontWeight: 500,
        fontSize: '0.75rem',
        '& .MuiChip-label': {
          px: 1.5,
        },
        ...sx,
      }}
      variant="outlined"
      {...props}
    />
  );
};

export default StatusChip;