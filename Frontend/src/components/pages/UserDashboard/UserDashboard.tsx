import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import Page from "../../layout/Page";
import { fetchGetUser } from "../../../api/UserClient";
import { Box, CircularProgress } from "@mui/material";
import type { User } from "../../../types/User/UserTypes";
import AccountSummaryCard from "./cards/AccountSummaryCard";
import MonthSelector from "./MonthSelector";
import RecentTransactionsCard from "./cards/RecentTransactionsCard";
import BalanceCard from "./cards/BalanceCard";

import GridLayout, { useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ExpenseChartCard from "./cards/ExpenseChartCard";
import AssetChartCard from "./cards/AssetChartCard";
import IncomeExpenseChartCard from "./cards/IncomeExpenseChartCard";

const layout: LayoutItem[] = [
  { i: "NetWorthCard", x: 0, y: 0, w: 1, h: 1 },
  { i: "LoanPaymentsCard", x: 1, y: 0, w: 1, h: 1 },
  { i: "ExpenseChartCard", x: 0, y: 1, w: 2, h: 2 },
  { i: "RecentTransactionsCard", x: 2, y: 0, w: 2, h: 3 },
  { i: "AccountsCard", x: 4, y: 0, w: 2, h: 5 },
  { i: "IncomeExpenseChartCard", x: 0, y: 3, w: 2, h: 2 },
  { i: "AssetChartCard", x: 2, y: 3, w: 2, h: 2 },
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
            <Box height="100%" padding="10px" display="flex" flexDirection="row" width="8%" alignItems="center" justifyContent="center">
                <Box sx={{position: "fixed"}}>
                    <MonthSelector/>
                </Box>
            </Box>
            
            <Box width="92%" ref={containerRef}>{mounted && (
                <GridLayout
                    gridConfig={{cols: 6, rowHeight: 100, margin: [20, 30]}}
                    layout={layout}
                    width={containerRef.current?.offsetWidth!!}
                >
                    <div key="NetWorthCard" style={{ width: "100%", height: "100%" }}>
                        <BalanceCard color="lightgreen" title="Net Worth" balance={user.netWorth} sx={{height: "100%", display: "flex", justifyContent: "center"}}/>
                    </div>
                    <div key="LoanPaymentsCard" style={{ width: "100%", height: "100%" }}>
                        <BalanceCard title="Monthly Loan Charges" balance={user.estimatedMonthlyInterestCharges} sx={{height: "100%", display: "flex", justifyContent: "center"}}/>
                    </div>
                    <div key="RecentTransactionsCard" style={{ width: "100%", height: "100%" }}>
                        <RecentTransactionsCard transactions={user.transactions} sx={{height: "100%"}}/>
                    </div>
                    <div key="IncomeExpenseChartCard" >
                        <IncomeExpenseChartCard labels={["1st", "2nd", "3rd", "4th"]} income={[1000, 400000, 600, 800000, 90000]} expenses={[2000, 30000, 4000000, 6000]}/>
                    </div>
                    <div key="AssetChartCard" style={{ width: "100%", height: "100%" }}>
                        <AssetChartCard accounts={user.bankAccounts.filter(a => a.isAsset)}/>
                    </div>
                    <div key="ExpenseChartCard" >
                        <ExpenseChartCard transactions={user.transactions}/>
                    </div>
                    <div key="AccountsCard" style={{ width: "100%", height: "100%" }}>
                        <AccountSummaryCard setUser={setUser} bankAccounts={user.bankAccounts} 
                            loanAccounts={user.loanAccounts} revolvingCreditAccounts={user.revolvingCreditAccounts}/>
                    </div>
                </GridLayout>
            )}</Box>
        </Page>
    )
}

export default UserDashboard;