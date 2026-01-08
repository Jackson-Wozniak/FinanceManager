import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import type { User } from "../../../types/User/UserTypes";
import AccountSummaryCard from "./cards/AccountSummaryCard";
import MonthSelector from "./MonthSelector";
import RecentTransactionsCard from "./cards/RecentTransactionsCard";
import BalanceCard from "./cards/BalanceCard";

import GridLayout, { useContainerWidth, type Layout, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const layout: LayoutItem[] = [
  { i: "NetWorthCard", x: 0, y: 0, w: 1, h: 1 },
  { i: "RecentTransactionsCard", x: 0, y: 1, w: 1, h: 1 },
  { i: "LoanPaymentsCard", x: 1, y: 0, w: 2, h: 2 },
];

export const UserDashboard: React.FC = () => {
    const auth = useAuth();
    const [user, setUser] = useState<User | undefined>();
    const { width, containerRef, mounted } = useContainerWidth();

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
        <Page sx={{flexDirection: "row"}}>
            <Box height="100%" display="flex" flexDirection="row" width="8%" marginTop="2px" padding="10px">
                <MonthSelector/>
            </Box>
            
            <Box width="60%" ref={containerRef}>{mounted && (
                <GridLayout
                    gridConfig={{cols: 3, rowHeight: 100, margin: [20, 30]}}
                    layout={layout}
                    width={containerRef.current?.offsetWidth!!}
                >
                    <div key="NetWorthCard" style={{ width: "100%", height: "100%" }}>
                        <BalanceCard title="Net Worth" balance={user.netWorth} sx={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}/>
                    </div>
                    <div key="RecentTransactionsCard" style={{ width: "100%", height: "100%" }}>
                        <BalanceCard title="Monthly Loan Charges" balance={user.estimatedMonthlyInterestCharges} sx={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}/>
                    </div>
                    <div key="LoanPaymentsCard" style={{ width: "100%", height: "100%" }}>
                        <RecentTransactionsCard transactions={user.transactions} sx={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}/>
                    </div>
                </GridLayout>
            )}</Box>
            <Box height="100%" display="flex" flexDirection="row" width="32%" marginTop="15px"padding="10px">
                <AccountSummaryCard setUser={setUser} bankAccounts={user.bankAccounts} 
                    loanAccounts={user.loanAccounts} revolvingCreditAccounts={user.revolvingCreditAccounts}/>
            </Box>
        </Page>
    )
}

export default UserDashboard;