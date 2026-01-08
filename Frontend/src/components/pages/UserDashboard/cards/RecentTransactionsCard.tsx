import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useTheme, type SxProps } from "@mui/material";
import type { Transaction } from "../../../../types/Transaction/TransactionTypes";
import type { Theme } from "@mui/material/styles";

const RecentTransactionsCard: React.FC<{
    transactions: Transaction[],
    sx?: SxProps<Theme>
}> = ({transactions, sx}) => {
    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: theme.palette.background.secondary,
            borderRadius: "5px",
            ...sx
        }}
        >
      <TableContainer sx={{width: "100%", height: "100%", backgroundColor: "none", border: "none", padding: 0}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.message}>
                <TableCell>{row.message}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.dateTime.toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    )
}

export default RecentTransactionsCard;