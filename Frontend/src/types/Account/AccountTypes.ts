import type { BankAccountDto, CreditAccountDto } from "./AccountDtoTypes";

export interface BankAccount{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface CreditAccount{

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
        
    };
}

export function fromCreditAccountDtos(accounts: CreditAccountDto[]): CreditAccount[]{
    return accounts.map(a => fromCreditAccountDto(a));
}