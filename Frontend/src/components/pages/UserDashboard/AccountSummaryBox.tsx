import Box from "@mui/material/Box";
import type { BankAccount, LoanAccount, RevolvingCreditAccount } from "../../../types/Account/AccountTypes";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { User } from "../../../types/User/UserTypes";
import { useState } from "react";
import NewAccountPopup from "../../shared/account/NewAccountPopup";

const AccountSummaryBox: React.FC<{
    bankAccounts: BankAccount[],
    revolvingCreditAccounts: RevolvingCreditAccount[],
    loanAccounts: LoanAccount[],
    setUser: (user: User) => void
}> = ({bankAccounts, revolvingCreditAccounts, loanAccounts, setUser}) => {
    const [showAddAccountDialog, setShowAddAccountDialog] = useState<boolean>(false);

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
        <Box display="flex" gap={4} marginLeft="10px">
            <Box flex={1} border="1px solid #ccc" borderRadius={2} p={2}>
                <Button onClick={() => setShowAddAccountDialog(true)}>New Account</Button>
                <Typography variant="h6" mb={1}>
                Bank Accounts
                </Typography>
                <hr/>
                {renderRows(bankAccounts)}
                <Typography variant="h6" mb={1}>
                Credit Accounts
                </Typography>
                <hr/>
                {renderRows(revolvingCreditAccounts)}
                <Typography variant="h6" mb={1}>
                Loan Accounts
                </Typography>
                <hr/>
                {renderRows(loanAccounts)}
            </Box>
            <NewAccountPopup open={showAddAccountDialog} 
                handleClose={() => setShowAddAccountDialog(false)} setUser={setUser}/>
        </Box>
    );
}

export default AccountSummaryBox;