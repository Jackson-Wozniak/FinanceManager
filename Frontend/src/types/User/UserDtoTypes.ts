export interface UserTokenDto{
    token: string
}

export interface UserBankAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface UserDto{
    username: string,
    bankAccounts: UserBankAccountDto[]
}