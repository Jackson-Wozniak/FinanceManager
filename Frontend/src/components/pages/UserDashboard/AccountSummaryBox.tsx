import Box from "@mui/material/Box";
import type { BankAccount, CreditAccount } from "../../../types/Account/AccountTypes";
import Typography from "@mui/material/Typography";

const AccountSummaryBox: React.FC<{
    bankAccounts: BankAccount[],
    creditAccounts: CreditAccount[]
}> = ({bankAccounts, creditAccounts}) => {
    const renderRows = (accounts: { name: string; balance: number }[]) =>
        accounts.map((acc, index) => (
            <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                py={0.5}
                px={1}
                mb="10px"
            >
                <Typography>{acc.name}</Typography>
                <Typography>{acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
            </Box>
    ));

  return (
    <Box display="flex" gap={4}>
      <Box flex={1} border="1px solid #ccc" borderRadius={2} p={2}>
        <Typography variant="h6" mb={1}>
          Bank Accounts
        </Typography>
        <hr/>
        {renderRows(bankAccounts)}
        <Typography variant="h6" mb={1}>
          Credit Accounts
        </Typography>
        <hr/>
        {renderRows(creditAccounts)}
      </Box>
    </Box>
  );
}

export default AccountSummaryBox;