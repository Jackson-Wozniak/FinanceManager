import { Box, useTheme } from "@mui/material";

const ContentContainer: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const theme = useTheme();

    return (
        <Box width="100%" height="94%" margin={0} padding={0} 
            sx={{backgroundColor: theme.palette.background.primary}}>
            {children}
        </Box>
    )
}

export default ContentContainer;