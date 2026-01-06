import type { BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "../Account/AccountDtoTypes"

export interface UserTokenDto{
    token: string
}

export interface UserDto{
    username: string,
    netWorth: number,
    estimatedMonthlyInterestCharges: number,
    bankAccounts: BankAccountDto[],
    revolvingCreditAccounts: RevolvingCreditAccountDto[],
    loanAccounts: LoanAccountDto[]
}