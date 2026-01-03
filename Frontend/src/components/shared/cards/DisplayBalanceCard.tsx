import { Box, Typography, type SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

const DisplayBalanceCard: React.FC<{
    title: string,
    balance: number,
    color?: string,
    accent?: string,
    sx?: SxProps<Theme>
}> = ({title, balance, color = "black", accent = "grey", sx}) => {
    return (
        <Box sx={{color: color, border: `1px solid ${accent}`, borderRadius: "5px", ...sx}}>
            <Typography>{title}</Typography>
            <Typography>{balance}</Typography>
        </Box>
    )
}

export default DisplayBalanceCard;