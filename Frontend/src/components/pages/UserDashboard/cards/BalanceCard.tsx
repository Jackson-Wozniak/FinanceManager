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
        <Box sx={{backgroundColor: theme.palette.background.secondary, display: "flex",
            flexDirection: "column", borderRadius: "5px", textAlign: "left", paddingTop: "10px", 
            paddingLeft: "15px", ...sx}}
        >
            <Typography variant="subtitle1" sx={{textAlign: "left"}}>{title}</Typography>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "left" }}>
                <Typography variant="h5" fontWeight="bold">
                    {balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </Typography>
            </Box>
        </Box>
    )
}

export default BalanceCard;