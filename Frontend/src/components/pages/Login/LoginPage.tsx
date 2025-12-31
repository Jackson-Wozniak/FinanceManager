import { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { fetchLoginUser, fetchRegisterUser } from "../../../api/UserAuthClient";
import { Box, Button, Checkbox, Input, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Page from "../../layout/Page";

const LoginPage: React.FC = () => {
    const auth = useAuth();
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async () => {
        try{
            const token = isLogin ? await fetchLoginUser(username, password)
                : await fetchRegisterUser(username, password);
            auth.login(token);
        }catch(e){
            alert(e);
        }
    }

    return (
        <Page alignment="center">
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column"
                sx={{width: "60%", alignItems: "center", justifyContent: "center"}}>
                <ToggleButtonGroup sx={{mb: "20px"}}
                    value={isLogin ? "login" : "register"} exclusive
                    onChange={() => setIsLogin(!isLogin)} aria-label="text alignment"
                >
                    <ToggleButton value="login" aria-label="left aligned">
                        Login
                    </ToggleButton>
                    <ToggleButton value="register" aria-label="centered">
                        Register
                    </ToggleButton>
                </ToggleButtonGroup>
                <TextField onChange={(e) => setUsername(e.target.value)} type="text" label="Username" 
                    variant="outlined" sx={{width: "60%", m: "10px"}}/>
                <TextField onChange={(e) => setPassword(e.target.value)} type="password" label="Password" 
                    variant="outlined" sx={{width: "60%", m: "10px"}}/>
                <Button onClick={handleSubmit} type="submit">Click</Button>
            </Box>
        </Page>
    )
}

export default LoginPage;