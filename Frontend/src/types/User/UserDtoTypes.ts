import type { BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "../Account/AccountDtoTypes"
import type { TransactionDto } from "../Transaction/TransactionDtoTypes"

export interface UserTokenDto{
    token: string
}

export interface UserDto{
    username: string,
    netWorth: number,
    estimatedMonthlyLoanPayments: number,
    bankAccounts: BankAccountDto[],
    revolvingCreditAccounts: RevolvingCreditAccountDto[],
    loanAccounts: LoanAccountDto[],
    transactions: TransactionDto[]
}