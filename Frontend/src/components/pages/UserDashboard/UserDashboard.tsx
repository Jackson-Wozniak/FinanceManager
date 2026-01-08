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

interface CardItem {
  id: string;
  title: string;
  w: number; // width in grid units
  h: number; // height in grid units
}

const cards: CardItem[] = [
  { id: "1", title: "Card 1", w: 1, h: 1 },
  { id: "2", title: "Card 2", w: 2, h: 2 },
  { id: "3", title: "Card 3", w: 1, h: 1 },
  { id: "4", title: "Card 4", w: 1, h: 2 },
  { id: "5", title: "Card 5", w: 1, h: 1 },
];

const layout: LayoutItem[] = cards.map((card, index) => ({
    i: card.id,
    x: index % 3, // initial x position
    y: Math.floor(index / 3), // initial y position
    w: card.w,
    h: card.h,
}));

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
            <Box height="100%" display="flex" flexDirection="row" width="10%" marginTop="2px" padding="10px">
                <MonthSelector/>
            </Box>
            
            <Box width="55%" ref={containerRef}>{mounted && (
                /*
                    done for the night, but I believe that if I use CardItem with ReactNode,
                    I can inject the card component into the CardItem array for each, and
                    use the layout like was used above and in previous commit to correctly
                    size each card as I want
                */
                <GridLayout
                    gridConfig={{cols: 3}}
                    layout={layout}
                    width={width}
                >
                    <BalanceCard title="Net Worth" balance={user.netWorth} sx={{width: "100%", height: 120}}/>
                    <BalanceCard title="Monthly Loan Charges" balance={user.estimatedMonthlyInterestCharges} sx={{gridColumn: "span 1", height: 120}}/>
                    <RecentTransactionsCard transactions={user.transactions} sx={{gridColumn: "span 2", height: 180}}/>
                </GridLayout>
            )}</Box>
            <Box height="100%" display="flex" flexDirection="row" width="35%" marginTop="15px"padding="10px">
                <AccountSummaryCard setUser={setUser} bankAccounts={user.bankAccounts} 
                    loanAccounts={user.loanAccounts} revolvingCreditAccounts={user.revolvingCreditAccounts}/>
            </Box>
        </Page>
    )
}

export default UserDashboard;