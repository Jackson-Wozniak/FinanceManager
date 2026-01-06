import type React from "react";
import type { User } from "../../../types/User/UserTypes";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import { AccountType, isBankAccount, isLoanAccount } from "../../../types/Account/AccountEnums";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../../providers/AuthProvider";
import { fetchCreateBankAccount, fetchCreateRevolvingCreditAccount, fetchCreateLoanAccount } from "../../../api/AccountClient";
import { CreateAccountReducer, initialCreateAccountForm, mapToBankAccountDto, mapToLoanAccountDto, mapToRevolvingCreditAccountDto } from "./CreateAccountDispatch";
import BankAccountInputs from "./inputs/BankAccountInputs";
import LoanAccountInputs from "./inputs/LoanAccountInputs";
import CreditAccountInputs from "./inputs/CreditAccountInputs";

const CreateAccountPopup: React.FC<{
    setUser: (user: User) => void,
    open: boolean,
    handleClose: () => void
}> = ({setUser, open, handleClose}) => {
    const auth = useAuth();
    const [formState, createAccountDispatch] = useReducer(CreateAccountReducer, initialCreateAccountForm);

    const handleSubmit = async () => {
        try{
            if(auth.token == null) return;
            let user: User;
            switch(formState.accountType){
                case AccountType.Checking:
                case AccountType.Savings: {
                    const dto = mapToBankAccountDto(formState);
                    user = await fetchCreateBankAccount(auth.token, dto);
                    break;
                }
                case AccountType.CreditCard: {
                    const dto = mapToRevolvingCreditAccountDto(formState);
                    user = await fetchCreateRevolvingCreditAccount(auth.token, dto);
                    break;
                }
                case AccountType.CarLoan:
                case AccountType.StudentLoan: {
                    const dto = mapToLoanAccountDto(formState);
                    user = await fetchCreateLoanAccount(auth.token, dto);
                    break;
                }
            }
            if(user == null){
                throw new Error("Error after getting user from server");
            }
            setUser(user);
            handleClose();
        }catch(e){
            alert(e);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign="center">Add Account</DialogTitle>

            <DialogContent>
                <TextField value={formState.name} variant="outlined" sx={{width: "60%", m: "10px"}}
                    onChange={(e) => createAccountDispatch({type: "UpdateField", payload: {name: e.target.value}})}
                    type="text" label="Account Name" 
                />
                
                <FormControl sx={{width: "60%", m: "10px"}}>
                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.accountType}
                        label="Account Type"
                        onChange={(e) => createAccountDispatch({type: "UpdateField", payload: { accountType: e.target.value }})}
                    >
                        {Object.values(AccountType).map((type: AccountType) => {
                            return <MenuItem key={type} value={type}>{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                {isBankAccount(formState.accountType) ? <BankAccountInputs formState={formState} dispatch={createAccountDispatch}/>
                    : isLoanAccount(formState.accountType) ? <LoanAccountInputs formState={formState} dispatch={createAccountDispatch}/> 
                    : <CreditAccountInputs formState={formState} dispatch={createAccountDispatch}/>}
                
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateAccountPopup;