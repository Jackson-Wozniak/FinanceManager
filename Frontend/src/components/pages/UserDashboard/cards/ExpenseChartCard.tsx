import type { Transaction } from "../../../../types/Transaction/TransactionTypes";
import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import 'chart.js/auto';

const ExpenseChartCard: React.FC<{
    transactions: Transaction[]
}> = ({transactions}) => {
    const theme = useTheme();
    const [map, setMap] = useState<[string, number][]>([]);

    useEffect(() => {
        const sums = new Map<string, number>();

        for(const transaction of transactions){
            sums.set(transaction.category, (sums.get(transaction.category) || 0) + transaction.value);
        }
        setMap(Array.from(sums));
    }, [transactions]);

    const data = {
        labels: map.map(([first, _]) => first),
        datasets: [{
            data: map.map(([_, second]) => second),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            borderColor: 'white',
            borderWidth: 1
        }]
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const value = context.raw;
                        return `$${value.toLocaleString("en-US")} spent this month`;
                    },
                },
            },
            legend: {
                position: 'right',
                labels: {
                    color: "white",
                }
            },
            title: {
                display: true,
                text: "Expenses by Category",
                color: "white",
                font: { size: 18, weight: "bold" },
                padding: { top: 10, bottom: 20 },
            },
        },
    };

    return (
        <Box sx={{height: "100%", backgroundColor: theme.palette.background.secondary, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "10px"}}>
            <Doughnut data={data} options={options} height="100%" width="100%"/>
        </Box>
    )
}

export default ExpenseChartCard;