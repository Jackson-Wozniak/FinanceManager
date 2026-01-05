
export interface BankAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface CreditAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
    termMonths: number,
    principalBalance: number
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

export function newBankAccountDto(name: string, institution: string, type: string, balance: number, interestRate: number): NewBankAccountDto{
    return {
        name: name,
        institutionName: institution,
        accountType: type,
        balance: balance,
        interestRate: interestRate
    }
}

export function newCreditAccountDto(name: string, institution: string, type: string, balance: number, interestRate: number, termMonths: number, principalBalance: number): NewCreditAccountDto{
    return {
        name: name,
        institutionName: institution,
        accountType: type,
        balance: balance,
        interestRate: interestRate,
        termMonths: termMonths,
        principalBalance: principalBalance
    }
}