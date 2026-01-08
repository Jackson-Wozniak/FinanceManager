import Box from "@mui/material/Box";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import type { SxProps } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

const Page: React.FC<{
    alignment?: "center" | "normal"
    children?: React.ReactNode,
    sx?: SxProps<Theme>
}> = ({alignment = "normal", children, sx}) => {
    return (
        <Box width="100%" maxWidth="100%" height="100%" margin={0} padding={0} display="flex" 
            sx={{overflowX: "none", overflowY: "auto", scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.2) transparent"}} flexDirection="column">
            <Header/>
            <ContentContainer>
                <Box sx={{display: "flex", flexDirection: "column", width: "100%", height: "95%",
                    alignItems: alignment, justifyContent: alignment, ...sx
                }}>{children}</Box>
            </ContentContainer>
        </Box>
    )
}

export default Page;