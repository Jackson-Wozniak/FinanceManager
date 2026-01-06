import { TextField, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material";
import type { CreateAccountForm, CreateAccountAction } from "../CreateAccountDispatch";

export const LoanAccountInputs: React.FC<{
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

            <TextField type="text" value={formState.principalBalance} label="Principal Balance"
                onChange={(e) => dispatch({type: "UpdateField", payload: {principalBalance: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.interestRate} label="Interest Rate"
                slotProps={{
                    input: {
                        endAdornment: (<InputAdornment position="end">%</InputAdornment>),
                    }
                }}
                onChange={(e) => dispatch({type: "UpdateField", payload: {interestRate: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <TextField type="text" value={formState.termMonths} label="Term (Months)"
                onChange={(e) => dispatch({type: "UpdateField", payload: {termMonths: Number(e.target.value)}})}
                variant="outlined" sx={{width: "60%", m: "10px"}}/>

            <ToggleButtonGroup
                color="primary"
                value={formState.isCompoundInterest ? "compound" : "simple"}
                exclusive
                onChange={(_, next) => dispatch({type: "UpdateField", payload: {isCompoundInterest: next === "compound"}})}
                aria-label="Platform"
            >
                <ToggleButton value="compound">Compound Interest</ToggleButton>
                <ToggleButton value="simple">Simple Interest</ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default LoanAccountInputs;