import type { BankAccountDto, CreditAccountDto } from "../Account/AccountDtoTypes"

export interface UserTokenDto{
    token: string
}

export interface UserDto{
    username: string,
    netWorth: number,
    estimatedMonthlyInterestCharges: number,
    bankAccounts: BankAccountDto[],
    creditAccounts: CreditAccountDto[]
}