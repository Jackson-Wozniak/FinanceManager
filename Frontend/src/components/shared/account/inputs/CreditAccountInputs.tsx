import { TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material";
import type { CreateAccountForm, CreateAccountAction } from "../CreateAccountDispatch";

export const CreditAccountInputs: React.FC<{
    formState: CreateAccountForm,
    dispatch: React.Dispatch<CreateAccountAction>
}> = ({formState, dispatch}) => {
    return (
        <>
            <TextField type="text" value={formState.issuer} label="Issuer"
                onChange={(e) => dispatch({type: "UpdateField", payload: {issuer: e.target.value}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.balance} label="Balance"
                onChange={(e) => dispatch({type: "UpdateField", payload: {balance: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.creditLimit} label="Credit Limit"
                onChange={(e) => dispatch({type: "UpdateField", payload: {creditLimit: Number(e.target.value)}})}
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

export default CreditAccountInputs;