import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface RowProps {
    type?: "space-evenly" | "space-between"
    children?: React.ReactNode;
    sx?: SxProps<Theme>
}

const SpacedRow: React.FC<RowProps> = ({ type = "space-evenly", children, sx }) => (
  <Box display="flex" width="100%" justifyContent={type} alignItems="center" sx={sx}>
    {children}
  </Box>
);

export default SpacedRow;