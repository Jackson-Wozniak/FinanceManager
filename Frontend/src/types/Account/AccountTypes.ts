import type { BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "./AccountDtoTypes";

export interface Account{
    name: string,
    accountType: string,
    isAsset: boolean,
    value: number
}

export interface BankAccount extends Account{
    bankName: string,
    balance: number,
    interestRate: number,
}

export interface RevolvingCreditAccount extends Account{
    balance: number,
    issuer: string,
    interestRate: number,
    creditLimit: number
}

export interface LoanAccount extends Account{
    balance: number,
    issuer: string,
    principalBalance: number,
    interestRate: number,
    termMonths: number,
    isCompoundInterest: boolean
}

export function fromBankAccountDto(account: BankAccountDto): BankAccount{
    return {
        name: account.name,
        bankName: account.bankName,
        accountType: account.accountType,
        balance: account.balance,
        interestRate: account.interestRate,
        isAsset: account.isAsset,
        value: account.value
    };
}

export function fromBankAccountDtos(accounts: BankAccountDto[]): BankAccount[]{
    return accounts.map(a => fromBankAccountDto(a));
}

export function fromRevolvingCreditAccountDto(account: RevolvingCreditAccountDto): RevolvingCreditAccount{
    return {
        name: account.name,
        accountType: account.accountType,
        balance: account.balance,
        interestRate: account.interestRate,
        issuer: account.issuer,
        creditLimit: account.creditLimit,
        isAsset: account.isAsset,
        value: account.value
    };
}

export function fromRevolvingCreditAccountDtos(accounts: RevolvingCreditAccountDto[]): RevolvingCreditAccount[]{
    return accounts.map(a => fromRevolvingCreditAccountDto(a));
}

export function fromLoanAccountDto(account: LoanAccountDto): LoanAccount{
    return {
        name: account.name,
        issuer: account.issuer,
        accountType: account.accountType,
        balance: account.balance,
        interestRate: account.interestRate,
        termMonths: account.termMonths,
        principalBalance: account.principalBalance,
        isCompoundInterest: account.isCompoundInterest,
        isAsset: account.isAsset,
        value: account.value
    };
}

export function fromLoanAccountDtos(accounts: LoanAccountDto[]): LoanAccount[]{
    return accounts.map(a => fromLoanAccountDto(a));
}