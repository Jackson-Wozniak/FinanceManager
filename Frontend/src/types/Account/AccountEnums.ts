
export enum AccountType{
    Savings = "Savings",
    Checking = "Checking",
    CreditCard = "Credit Card",
    StudentLoan = "Student Loan",
    CarLoan = "Car Loan"
}

export function isBankAccount(type: AccountType): boolean{
    return type === AccountType.Savings || type === AccountType.Checking;
}