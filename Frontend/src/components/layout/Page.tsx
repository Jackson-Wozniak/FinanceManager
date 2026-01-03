import Box from "@mui/material/Box";
import ContentContainer from "./ContentContainer";
import Header from "./Header";

const Page: React.FC<{
    alignment?: "center" | "none"
    children?: React.ReactNode
}> = ({alignment = "none", children}) => {
    return (
        <Box width="100%" height="100%" margin={0} padding={0} display="flex" flexDirection="column">
            <Header/>
            <ContentContainer>
                <Box sx={{display: "flex", width: "100%", height: "90%",
                    alignItems: alignment === "center" ? "center" : "normal",
                    justifyContent: alignment === "center" ? "center" : "normal",
                }}>{children}</Box>
            </ContentContainer>
        </Box>
    )
}

export default Page;