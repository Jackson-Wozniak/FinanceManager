import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import { Box, CircularProgress, Typography } from "@mui/material";
import type { User } from "../../../types/User/UserTypes";
import NetWorthCard from "./cards/NetWorthCard";
import AccountSummaryCard from "./cards/AccountSummaryCard";
import MonthSelector from "./MonthSelector";
import RecentTransactionsCard from "./cards/RecentTransactionsCard";

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
                console.log(user.transactions);
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
        <Page sx={{flexDirection: "row"}}>
            <Box height="100%" display="flex" flexDirection="row" width="10%" marginTop="2px" padding="10px">
                <MonthSelector/>
            </Box>
            <Box height="100%" width="55%" marginTop="15px" 
                padding="10px" sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 2,
                }}>
                <NetWorthCard balance={user.netWorth} sx={{gridColumn: "span 2", height: 120}}/>
                <NetWorthCard balance={user.netWorth} sx={{gridColumn: "span 1", height: 120}}/>
                <NetWorthCard balance={user.netWorth} sx={{gridColumn: "span 2", height: 120}}/>
                <NetWorthCard balance={user.netWorth} sx={{gridColumn: "span 1", height: 120}}/>
                <RecentTransactionsCard transactions={user.transactions} sx={{gridColumn: "span 2", height: 180}}/>
                <NetWorthCard balance={user.netWorth} sx={{gridColumn: "span 1", height: 120}}/>
            </Box>
            <Box height="100%" display="flex" flexDirection="row" width="35%" marginTop="15px"padding="10px">
                <AccountSummaryCard setUser={setUser} bankAccounts={user.bankAccounts} 
                    loanAccounts={user.loanAccounts} revolvingCreditAccounts={user.revolvingCreditAccounts}/>
            </Box>
        </Page>
    )
}

export default UserDashboard;