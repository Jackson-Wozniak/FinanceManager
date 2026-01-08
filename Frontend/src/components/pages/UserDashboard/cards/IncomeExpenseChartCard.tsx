import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

interface Props {
  labels: string[];
  expenses: number[];
  income: number[];
}

const IncomeExpenseChartCard: React.FC<Props> = ({ labels, expenses, income }) => {
    const theme = useTheme();
    const data = {
        labels,
        datasets: [
            {
                label: "Expenses",
                data: expenses,
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(230, 35, 77, 1)",
                tension: 0.4,
                pointRadius: 4,
            },
            {
                label: "Income",
                data: income,
                fill: true,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 124, 1)",
                tension: 0.4,
                pointRadius: 4,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: { color: "white" },
            },
            title: {
                display: true,
                text: "Income vs Expenses",
                color: "white",
                font: { size: 18, weight: "bold" },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `$${context.raw.toLocaleString("en-US")}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "white", },
                grid: { display: false, color: "rgba(255,255,255,0.1)" },
            },
            y: {
                ticks: { color: "white", callback: function(value: number, _: any) {
                    return `$${value.toLocaleString("en-US")}`
                } },
                grid: { display: false, color: "rgba(255,255,255,0.1)" },
            },
        },
    };

    return (
        <Box sx={{height: "100%", backgroundColor: theme.palette.background.secondary, 
            display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"}}>
            <Line data={data} options={options} width="100%" height="100%"/>
        </Box>
    );
};

export default IncomeExpenseChartCard;