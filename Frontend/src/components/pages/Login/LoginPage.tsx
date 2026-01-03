import { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { fetchLoginUser, fetchRegisterUser } from "../../../api/UserAuthClient";
import { Box, Button, TextField, Typography } from "@mui/material";
import Page from "../../layout/Page";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const auth = useAuth();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const token = isLogin ? await fetchLoginUser(username, password)
                : await fetchRegisterUser(username, password);
            auth.login(token);
            navigate("/dashboard");
        }catch(e){
            alert(e);
        }
    }

    return (
        <Page alignment="center">
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column"
                sx={{
                    width: "35%", alignItems: "center", justifyContent: "center",
                    backgroundColor: theme.palette.background.secondary, padding: "30px 20px 40px",
                    borderRadius: "10px"
                }}>
                <Typography variant="h3" color={theme.palette.text.primary} mb="20px">{isLogin ? "Login" : "Register"}</Typography>
                <TextField onChange={(e) => setUsername(e.target.value)} type="text" label="Username" 
                    variant="outlined" sx={{width: "60%", m: "10px"}}/>
                <TextField onChange={(e) => setPassword(e.target.value)} type="password" label="Password" 
                    variant="outlined" sx={{width: "60%", m: "10px"}}/>
                <Button onClick={handleSubmit} type="submit" variant="contained" sx={{m: "10px"}}>
                    Submit
                </Button>
                <Button onClick={() => setIsLogin(!isLogin)} type="button" variant="text">
                    {isLogin ? "Don't have an account? Click here to register." 
                        : "Already have an account? Click here to login."}
                </Button>
            </Box>
        </Page>
    )
}

export default LoginPage;