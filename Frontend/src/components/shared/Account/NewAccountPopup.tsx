import type React from "react";
import type { User } from "../../../types/User/UserTypes";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AccountType } from "../../../types/Account/AccountEnums";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Input, InputAdornment } from "@mui/material";
import { useAuth } from "../../../providers/AuthProvider";
import { newBankAccountDto } from "../../../types/Account/AccountDtoTypes";
import { fetchCreateBankAccount } from "../../../api/AccountClient";

const NewAccountPopup: React.FC<{
    setUser: (user: User) => void,
    open: boolean,
    handleClose: () => void
}> = ({setUser, open, handleClose}) => {
    const auth = useAuth();
    const [name, setName] = useState<string>("");
    const [institutionName, setInstitutionName] = useState<string>("");
    const [accountType, setAccountType] = useState<AccountType>(AccountType.Savings);
    const [balance, setBalance] = useState<number>(0.0);
    const [interestRate, setInterestRate] = useState<number>(0.0);

    const handleSubmit = async () => {
        try{
            if(auth.token == null) return;
            const dto = newBankAccountDto(name, institutionName, accountType, balance, interestRate);
            const user = await fetchCreateBankAccount(auth.token, dto);
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
                <TextField onChange={(e) => setName(e.target.value)} type="text" label="Account Name" 
                    value={name} variant="outlined" sx={{width: "60%", m: "10px"}}/>
                <TextField onChange={(e) => setInstitutionName(e.target.value)} type="text"
                    value={institutionName} label="Institution Name" variant="outlined" sx={{width: "60%", m: "10px"}}/>
                
                <FormControl sx={{width: "60%", m: "10px"}}>
                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={accountType}
                        label="Account Type"
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        {Object.values(AccountType).map((type: AccountType) => {
                            return <MenuItem key={type} value={type}>{type}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField onChange={(e) => setBalance(Number(e.target.value))} type="number"
                    value={balance} label="Balance" variant="outlined" sx={{width: "60%", m: "10px"}}/>

                <TextField onChange={(e) => setInterestRate(Number(e.target.value))} type="number"
                    slotProps={{
                        input: {
                            endAdornment: (<InputAdornment position="end">%</InputAdornment>),
                        }
                    }}
                    value={interestRate} label="Interest Rate" variant="outlined" sx={{width: "60%", m: "10px"}}/>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewAccountPopup;