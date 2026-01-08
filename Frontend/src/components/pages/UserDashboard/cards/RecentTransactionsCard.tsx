import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useTheme, type SxProps, Card, CardHeader, Typography } from "@mui/material";
import type { Transaction } from "../../../../types/Transaction/TransactionTypes";
import type { Theme } from "@mui/material/styles";

const RecentTransactionsCard: React.FC<{
    transactions: Transaction[],
    sx?: SxProps<Theme>
}> = ({transactions, sx}) => {
    const theme = useTheme();

    return (
        <Card sx={{
            background: theme.palette.background.secondary,
            borderRadius: "5px",
            ...sx
        }}
        >
          <CardHeader title={<Typography variant="h6">Recent Transactions</Typography>}/>
      <TableContainer sx={{width: "100%", height: "100%", backgroundColor: "none", border: "none", padding: 0}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row: Transaction, index: number) => (
              <TableRow key={index} sx={{backgroundColor: index % 2 == 0 ? theme.palette.background.secondaryAccent : "none"}}>
                <TableCell>{row.message}</TableCell>
                <TableCell>{row.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}</TableCell>
                <TableCell>{row.dateTime.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    )
}

export default RecentTransactionsCard;