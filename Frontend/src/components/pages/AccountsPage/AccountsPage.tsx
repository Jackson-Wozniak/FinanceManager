import TableContainer from "@mui/material/TableContainer";
import Page from "../../layout/Page";
import { Table, TableHead, TableRow, TableCell, TableBody, useTheme } from "@mui/material";
import { useAuth } from "../../../providers/AuthProvider";
import { useEffect, useState } from "react";
import type { AccountsListing, BankAccount, LoanAccount, RevolvingCreditAccount } from "../../../types/Account/AccountTypes";
import { fetchGetAccountsListing } from "../../../api/AccountClient";

const AccountsPage: React.FC = () => {
    const auth = useAuth();
    const theme = useTheme();
    const [accountsListing, setAccountsListing] = useState<AccountsListing | undefined>();

    useEffect(() => {
        const fetchAccounts = async () => {
            try{
                const accounts = await fetchGetAccountsListing(auth.token!!);
                setAccountsListing(accounts);
            }catch (e){
                alert(e);
            }
        }
        fetchAccounts();
    }, [auth.token]);

    if(accountsListing == null){
        return <></>
    }

    return (
        <Page alignment="center">
            <TableContainer sx={{width: "100%", backgroundColor: "none", border: "none", marginTop: "20px", padding: "20px", borderRadius: "10px"}}>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{backgroundColor: theme.palette.background.accent}}>
              <TableCell>Name</TableCell>
              <TableCell>Bank/Issuer</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Value (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor: theme.palette.background.secondary}}>
            {accountsListing.bankAccounts.map((row: BankAccount, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.bankName}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell>{row.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}</TableCell>
              </TableRow>
            ))}
            {accountsListing.loanAccounts.map((row: LoanAccount, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.issuer}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell>{row.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}</TableCell>
              </TableRow>
            ))}
            {accountsListing.revolvingCreditAccounts.map((row: RevolvingCreditAccount, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.issuer}</TableCell>
                <TableCell>{row.accountType}</TableCell>
                <TableCell>{row.value.toLocaleString("en-US", { style: "currency", currency: "USD" })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Page>
    )
}

export default AccountsPage;