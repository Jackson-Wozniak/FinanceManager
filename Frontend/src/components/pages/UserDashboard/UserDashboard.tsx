import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import { Box, CircularProgress, Typography } from "@mui/material";
import type { User } from "../../../types/User/UserTypes";
import type { BankAccount } from "../../../types/Account/AccountTypes";

export const UserDashboard: React.FC = () => {
    const auth = useAuth();
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        const fetchUser = async () => {
            try{
                if(auth.token == null) return;
                const user = await fetchGetUser(auth.token);
                if(user == null){
                    throw new Error("Error after getting user from server");
                }
                setUser(user);
            }catch(e){
                alert("Logging out");
                auth.logout();
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
            {user.bankAccounts.map((account: BankAccount, index: number) => {
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