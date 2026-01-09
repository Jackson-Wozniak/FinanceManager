import type { Transaction } from "../../../../types/Transaction/TransactionTypes";
import { Box, Card, CardHeader, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import TransactionCategoryIcon from "../../../shared/transaction/TransactionCategoryIcon";
import type { TransactionCategory } from "../../../../types/Transaction/TransactionEnums";

const ExpenseChartCard: React.FC<{
    transactions: Transaction[]
}> = ({transactions}) => {
    const theme = useTheme();
    const [map, setMap] = useState<[string, number][]>([]);

    useEffect(() => {
        const sums = new Map<string, number>();

        for(const transaction of transactions){
            if(!transaction.isExpense) continue;
            sums.set(transaction.category, (sums.get(transaction.category) || 0) + transaction.value);
        }
        setMap(Array.from(sums));
    }, [transactions]);

    return (
        <Card sx={{maxHeight: "100%", background: theme.palette.background.secondary, overflowY: "auto"}}>
            <CardHeader title={<Typography variant="h6">Spend by Category</Typography>}/>
            <Box sx={{width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center", justifyContent: "center"}}>
                {map.map((pair: [string, number], index: number) => {
                    return (
                        <Box key={index} display="flex" flexDirection="row" width="100%" alignItems="center" justifyContent="center" mb="10px">
                            <TransactionCategoryIcon category={pair[0] as TransactionCategory}/>
                            <Box marginLeft="15px" display="flex" flexDirection="column" width="50%" alignItems="flex-start" justifyContent="center">
                                <Typography>{pair[0]}</Typography>
                                <Typography>{pair[1].toLocaleString("en-US", { style: "currency", currency: "USD" })}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Card>
    )
}

export default ExpenseChartCard;