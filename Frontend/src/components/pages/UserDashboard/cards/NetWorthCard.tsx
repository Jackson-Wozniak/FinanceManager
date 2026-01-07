import { Box, Typography, type SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const NetWorthCard: React.FC<{
    balance: number,
    sx?: SxProps<Theme>
}> = ({balance, sx}) => {
    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.secondary, 
            padding: "15px 35px 15px 35px", borderRadius: "5px", margin: "10px", ...sx}}>
            <Typography>Net Worth</Typography>
            <Typography>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
        </Box>
    )
}

export default NetWorthCard;