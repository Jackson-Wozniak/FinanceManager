import { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { fetchLoginUser, fetchRegisterUser } from "../../../api/UserAuthClient";
import { Button, Input } from "@mui/material";

const LoginPage: React.FC = () => {
    const auth = useAuth();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        try{
            const token = await fetchLoginUser(username, password);
            auth.login(token);
        }catch(e){
            alert(e);
        }
    }

    return (
        <>
            <Input onChange={(e) => setUsername(e.target.value)} type="text"/>
            <Input onChange={(e) => setPassword(e.target.value)} type="password"/>
            <Button onClick={handleLogin}>Click</Button>
        </>
    )
}

export default LoginPage;