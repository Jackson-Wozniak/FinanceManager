import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import { Box, CircularProgress, Typography } from "@mui/material";
import type { User } from "../../../types/User/UserTypes";
import type { BankAccount } from "../../../types/Account/AccountTypes";
import AccountSummaryBox from "./AccountSummaryBox";
import DisplayBalanceCard from "../../shared/cards/DisplayBalanceCard";
import SpaceEvenlyRow from "../../shared/styled/SpaceEvenlyRow";

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
            <Box display="flex" width="100%" height="100%" flexDirection="column">
                <SpaceEvenlyRow>
                    <DisplayBalanceCard title="Net Worth" balance={user.netWorth}/>
                    <DisplayBalanceCard title="Montly Interest Charges" balance={user.estimatedMonthlyInterestCharges}/>
                </SpaceEvenlyRow>
                <AccountSummaryBox bankAccounts={user.bankAccounts} creditAccounts={user.creditAccounts}/>
            </Box>
        </Page>
    )
}

export default UserDashboard;