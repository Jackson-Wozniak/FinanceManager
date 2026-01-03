import React from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface RowProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>
}

const SpaceEvenlyRow: React.FC<RowProps> = ({ children, sx }) => (
  <Box display="flex" width="100%" justifyContent="space-evenly" alignItems="center" sx={sx}>
    {children}
  </Box>
);

export default SpaceEvenlyRow;