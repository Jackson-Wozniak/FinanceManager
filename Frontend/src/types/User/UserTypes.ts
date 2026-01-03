import { fromBankAccountDtos, fromCreditAccountDtos, type BankAccount, type CreditAccount } from "../Account/AccountTypes"
import type { UserDto, UserTokenDto } from "./UserDtoTypes"

export interface UserToken{
    token: string
}

export interface User{
    username: string,
    netWorth: number,
    estimatedMonthlyInterestCharges: number,
    bankAccounts: BankAccount[],
    creditAccounts: CreditAccount[]
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
        creditAccounts: fromCreditAccountDtos(user.creditAccounts),
    }
}