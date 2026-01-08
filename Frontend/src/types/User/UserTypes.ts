import { fromBankAccountDtos, fromLoanAccountDtos, fromRevolvingCreditAccountDtos, type BankAccount, type LoanAccount, type RevolvingCreditAccount } from "../Account/AccountTypes"
import { fromTransactionDtos, type Transaction } from "../Transaction/TransactionTypes"
import type { UserDto, UserTokenDto } from "./UserDtoTypes"

export interface UserToken{
    token: string
}

export interface User{
    username: string,
    netWorth: number,
    estimatedMonthlyInterestCharges: number,
    bankAccounts: BankAccount[],
    revolvingCreditAccounts: RevolvingCreditAccount[],
    loanAccounts: LoanAccount[],
    transactions: Transaction[]
}

export function fromUserTokenDto(userTokenDto: UserTokenDto): UserToken{
    return {
        token: userTokenDto.token
    }
}

export function fromUserDto(user: UserDto): User{
    return {
        username: user.username,
        netWorth: user.netWorth,
        estimatedMonthlyInterestCharges: user.estimatedMonthlyInterestCharges,
        bankAccounts: fromBankAccountDtos(user.bankAccounts),
        revolvingCreditAccounts: fromRevolvingCreditAccountDtos(user.revolvingCreditAccounts),
        loanAccounts: fromLoanAccountDtos(user.loanAccounts),
        transactions: fromTransactionDtos(user.transactions)
    }
}