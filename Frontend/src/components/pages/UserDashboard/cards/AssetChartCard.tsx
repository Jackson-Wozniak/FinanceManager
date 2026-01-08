import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import type { Account } from "../../../../types/Account/AccountTypes";

const AssetChartCard: React.FC<{
    accounts: Account[]
}> = ({accounts}) => {
    const theme = useTheme();
    const [map, setMap] = useState<[string, number][]>([]);

    useEffect(() => {
        const sums = new Map<string, number>();

        for(const account of accounts){
            sums.set(account.accountType, (sums.get(account.accountType) || 0) + account.value);
        }
        setMap(Array.from(sums));
    }, [accounts]);

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
                        return `$${value.toLocaleString("en-US")}`;
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
                text: "Assets Owned",
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

export default AssetChartCard;