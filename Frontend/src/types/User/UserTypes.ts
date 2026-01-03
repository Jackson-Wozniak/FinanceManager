import { fromBankAccountDtos, fromCreditAccountDtos, type BankAccount, type CreditAccount } from "../Account/AccountTypes"
import type { UserTokenDto } from "./UserDtoTypes"

export interface UserToken{
    token: string
}

export interface User{
    username: string,
    bankAccounts: BankAccount[],
    creditAccounts: CreditAccount[]
}

export function fromUserTokenDto(userTokenDto: UserTokenDto): UserToken{
    return {
        token: userTokenDto.token
    }
}

export function fromUserDto(user: User): User{
    return {
        username: user.username,
        bankAccounts: fromBankAccountDtos(user.bankAccounts),
        creditAccounts: fromCreditAccountDtos(user.creditAccounts),
    }
}