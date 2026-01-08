import { Box, Typography, type SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const BalanceCard: React.FC<{
    title: string,
    balance: number,
    sx?: SxProps<Theme>
}> = ({title, balance, sx}) => {
    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.secondary, 
            borderRadius: "5px", ...sx}}>
            <Typography>{title}</Typography>
            <Typography>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
        </Box>
    )
}

export default BalanceCard;