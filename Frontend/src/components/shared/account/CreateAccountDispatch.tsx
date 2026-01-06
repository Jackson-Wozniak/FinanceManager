import type { AccountDto, BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "../../../types/Account/AccountDtoTypes";
import { AccountType } from "../../../types/Account/AccountEnums";

export interface CreateAccountForm{
    name: string,
    accountType: AccountType,

    balance: number,
    principalBalance: number,
    interestRate: number,

    isCompoundInterest: boolean,
    creditLimit: number,
    termMonths: number,

    issuer: string,
    bankName: string,
}

export const initialCreateAccountForm: CreateAccountForm = {
    name: "",
    accountType: AccountType.Savings,
    balance: 0.0,
    interestRate: 0.0,
    bankName: "",
    principalBalance: 0.0,
    issuer: "",
    creditLimit: 0.0,
    termMonths: 0,
    isCompoundInterest: false,
}

export function mapToBankAccountDto(form: CreateAccountForm){
    const bankAccount: BankAccountDto = {
        name: form.name,
        accountType: form.accountType,
        bankName: form.bankName!,
        balance: form.balance!,
        interestRate: form.interestRate!
    }
    return bankAccount;
}

export function mapToRevolvingCreditAccountDto(form: CreateAccountForm){
    const creditAccount: RevolvingCreditAccountDto = {
        name: form.name,
        accountType: form.accountType,
        issuer: form.issuer,
        balance: form.balance,
        interestRate: form.interestRate,
        creditLimit: form.creditLimit
    }
    return creditAccount;
}

export function mapToLoanAccountDto(form: CreateAccountForm){
    const loanAccount: LoanAccountDto = {
        name: form.name,
        accountType: form.accountType,
        issuer: form.issuer,
        balance: form.balance,
        principalBalance: form.principalBalance,
        interestRate: form.interestRate,
        termMonths: form.termMonths,
        isCompoundInterest: form.isCompoundInterest
    }
    return loanAccount;
}

export type CreateAccountAction = 
    | { type: "UpdateField", payload: Partial<CreateAccountForm> };

export const CreateAccountReducer = (state: CreateAccountForm, action: CreateAccountAction) => {
    switch(action.type){
        case "UpdateField": return { ...state, ...action.payload };
        default: return state;
    }
}