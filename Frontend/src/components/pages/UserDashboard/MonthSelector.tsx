import { Box, Button, Typography, useTheme, type SxProps, type Theme } from "@mui/material";

const MonthSelector: React.FC<{
    sx?: SxProps<Theme>
}> = ({sx}) => {
    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.secondary,
            padding: "10px 0px 10px 0px", borderRadius: "50px",
            width: "90%", height: "100%", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-evenly", textAlign: "center", ...sx}}
        >
            <Typography fontWeight="bold">2026</Typography>
            <Button variant="text">Jan</Button>
            <Button variant="text">Feb</Button>
            <Button variant="text">Mar</Button>
            <Button variant="text">Apr</Button>
            <Button variant="text">May</Button>
            <Button variant="text">Jun</Button>
            <Button variant="text">Jul</Button>
            <Button variant="text">Aug</Button>
            <Button variant="text">Sep</Button>
            <Button variant="text">Oct</Button>
            <Button variant="text">Nov</Button>
            <Button variant="text">Dec</Button>
        </Box>
    )
}

export default MonthSelector;