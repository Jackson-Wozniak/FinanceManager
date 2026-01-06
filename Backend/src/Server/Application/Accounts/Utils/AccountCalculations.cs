using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Utils;

public static class AccountCalculations
{
    public static decimal CalculateNetWorth(List<Account> accounts)
    {
        var sum = accounts.Sum(b => b.IsAsset ? b.Value : -b.Value);
        return Math.Round(sum, 2);
    }

    public static decimal CalculateMonthlyLoanPayments(List<LoanAccount> accounts)
    {
        var sum = accounts.Sum(a => 
            (a.IsCompoundInterest ? a.Balance : a.PrincipalBalance * a.InterestRate) / 12);
        return Math.Round(sum, 2);
    }
}