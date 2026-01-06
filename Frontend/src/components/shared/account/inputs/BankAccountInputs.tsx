import type React from "react";
import type { CreateAccountAction, CreateAccountForm } from "../CreateAccountDispatch";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export const BankAccountInputs: React.FC<{
    formState: CreateAccountForm,
    dispatch: React.Dispatch<CreateAccountAction>
}> = ({formState, dispatch}) => {
    return (
        <>
            <TextField type="text" value={formState.bankName} label="Bank Name"
                onChange={(e) => dispatch({type: "UpdateField", payload: {bankName: e.target.value}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.balance} label="Balance"
                onChange={(e) => dispatch({type: "UpdateField", payload: {balance: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.interestRate} label="Interest Rate"
                slotProps={{
                    input: {
                        endAdornment: (<InputAdornment position="end">%</InputAdornment>),
                    }
                }}
                onChange={(e) => dispatch({type: "UpdateField", payload: {interestRate: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>
        </>
    )
}

export default BankAccountInputs;