using System.Diagnostics;

namespace Server.Application.Accounts.Enums;

public enum AccountType
{
    Savings,
    Checking,
    CreditCard,
    StudentLoan,
    CarLoan
}

public static class AccountTypeUtils
{
    public static AccountType? TryParse(string name)
    {
        return name.ToLower().Replace(" ", "") switch
        {
            "savings" => AccountType.Savings,
            "checking" => AccountType.Checking,
            "creditcard" => AccountType.CreditCard,
            "studentloan" => AccountType.StudentLoan,
            "carloan" => AccountType.CarLoan,
            _ => null
        };
    }

    public static bool IsBankAccount(this AccountType? type)
    {
        return type is AccountType.Savings or AccountType.Checking;
    }

    public static bool IsRevolvingCreditAccount(this AccountType? type)
    {
        return type is AccountType.CreditCard;
    }

    public static bool IsLoanAccount(this AccountType? type)
    {
        return type is AccountType.StudentLoan or AccountType.CarLoan;
    }
}