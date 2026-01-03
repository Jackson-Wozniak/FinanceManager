import type { BankAccountDto, CreditAccountDto } from "../Account/AccountDtoTypes"

export interface UserTokenDto{
    token: string
}

export interface UserDto{
    username: string,
    bankAccounts: BankAccountDto[],
    creditAccounts: CreditAccountDto[]
}