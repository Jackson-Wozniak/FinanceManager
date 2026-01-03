import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import type { UserDto } from "../../../types/User/UserDtoTypes";
import { Button, CircularProgress, Typography } from "@mui/material";

export const UserDashboard: React.FC = () => {
    const auth = useAuth();
    const [user, setUser] = useState<UserDto | undefined>();

    useEffect(() => {
        const fetchUser = async () => {
            try{
                if(auth.token == null) return;
                const user = await fetchGetUser(auth.token);
                setUser(user);
            }catch(e){
                alert(e);
            }
        }
        
        fetchUser();
    }, [auth.token]);

    if(user == null){
        return <CircularProgress/>
    }

    return (
        <Page>
            <Typography>{user.username}</Typography>
        </Page>
    )
}

export default UserDashboard;