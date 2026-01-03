import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const HeaderLink: React.FC<{text: string, link: string}> = ({text, link}) => {
    return (
        <Button component={Link} to={link} sx={{textDecoration: "none", padding: "0px 20px", color: "text.primary"}}>
            {text}
        </Button>
    )
}

const Header: React.FC<{}> = () => {
    const theme = useTheme();
    const auth = useAuth();
    
    return (
        <Box width="100%" height="10%" sx={{backgroundColor: theme.palette.background.secondary}}
            display="flex" justifyContent="space-between" alignItems="center" margin={0}>
            <Stack height="100%" direction="row" display="flex" justifyContent="space-evenly" gap={0}>
                <HeaderLink text="Home" link="/dashboard"/>
            </Stack>
            <Box display="flex" alignItems="center" gap={2} height="100%">
                <Button onClick={auth.logout} variant="text">Logout</Button>              
            </Box>
        </Box>
    )
}

export default Header;