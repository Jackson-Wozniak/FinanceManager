
export interface AccountDto{
    name: string,
    accountType: string,
    isAsset: boolean,
    value: number
}

export interface BankAccountDto extends AccountDto{
    bankName: string,
    balance: number,
    interestRate: number,
}

export interface RevolvingCreditAccountDto extends AccountDto{
    balance: number,
    issuer: string,
    interestRate: number,
    creditLimit: number
}

export interface LoanAccountDto extends AccountDto{
    balance: number,
    principalBalance: number,
    issuer: string,
    interestRate: number,
    isCompoundInterest: boolean,
    termMonths: number
}

export interface NewBankAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface NewCreditAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
    termMonths: number,
    principalBalance: number
}