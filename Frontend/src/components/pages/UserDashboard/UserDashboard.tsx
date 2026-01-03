import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import type { UserBankAccountDto, UserDto } from "../../../types/User/UserDtoTypes";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

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
            <Typography sx={{color: "white"}}>{user.username}</Typography>
            {user.bankAccounts.map((account: UserBankAccountDto, index: number) => {
                return (
                    <Box key={index} display="flex">
                        <Typography sx={{color: "white"}}>{account.name}</Typography>
                        <Typography sx={{color: "white"}}>{account.institutionName}</Typography>
                        <Typography sx={{color: "white"}}>{account.accountType}</Typography>
                        <Typography sx={{color: "white"}}>{account.balance}</Typography>
                        <Typography sx={{color: "white"}}>{account.interestRate}</Typography>
                    </Box>
                )
            })}
        </Page>
    )
}

export default UserDashboard;