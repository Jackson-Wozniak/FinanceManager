import type { BankAccountDto, CreditAccountDto } from "./AccountDtoTypes";

export interface BankAccount{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface CreditAccount{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
    termMonths: number,
    principalBalance: number
}

export function fromBankAccountDto(account: BankAccountDto): BankAccount{
    return {
        name: account.name,
        institutionName: account.institutionName,
        accountType: account.accountType,
        balance: account.balance,
        interestRate: account.interestRate
    };
}

export function fromBankAccountDtos(accounts: BankAccountDto[]): BankAccount[]{
    return accounts.map(a => fromBankAccountDto(a));
}

export function fromCreditAccountDto(account: CreditAccountDto): CreditAccount{
    return {
        name: account.name,
        institutionName: account.institutionName,
        accountType: account.accountType,
        balance: account.balance,
        interestRate: account.interestRate,
        termMonths: account.termMonths,
        principalBalance: account.principalBalance
    };
}

export function fromCreditAccountDtos(accounts: CreditAccountDto[]): CreditAccount[]{
    return accounts.map(a => fromCreditAccountDto(a));
}