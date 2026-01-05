
export interface BankAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
}

export interface CreditAccountDto{

}

export interface NewBankAccountDto{
    name: string,
    institutionName: string,
    accountType: string,
    balance: number,
    interestRate: number,
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