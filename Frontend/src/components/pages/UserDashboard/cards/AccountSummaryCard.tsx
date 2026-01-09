import { useState } from "react";
import type { BankAccount, LoanAccount, RevolvingCreditAccount } from "../../../../types/Account/AccountTypes";
import type { User } from "../../../../types/User/UserTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateAccountPopup from "../../../shared/account/CreateAccountPopup";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const AccountSummaryCard: React.FC<{
    bankAccounts: BankAccount[],
    revolvingCreditAccounts: RevolvingCreditAccount[],
    loanAccounts: LoanAccount[],
    setUser: (user: User) => void
}> = ({bankAccounts, revolvingCreditAccounts, loanAccounts, setUser}) => {
    const theme = useTheme();
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
        <Box width="100%" maxHeight="100%" sx={{
            backgroundColor: theme.palette.background.secondary}} display="flex" gap={4} 
            borderRadius="5px" marginLeft="10px" position="relative">
            <Box flex={1} p={2} sx={{overflowY: "auto", paddingBottom: "10px", position: "relative"}}>
                <Button component={Link} to="/accounts" size="small" sx={{position: "absolute", top: 0, right: 0}}>Edit Accounts</Button>
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
            <CreateAccountPopup open={showAddAccountDialog} 
                handleClose={() => setShowAddAccountDialog(false)} setUser={setUser}/>
        </Box>
    );
}

export default AccountSummaryCard;