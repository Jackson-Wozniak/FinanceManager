using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Utils;

public static class AccountCalculations
{
    public static decimal CalculateNetWorth(List<BankAccount> bankAccounts, List<CreditAccount> creditAccounts)
    {
        var bankBalance = bankAccounts.Sum(b => b.Balance);
        var creditBalance = creditAccounts.Sum(c => c.Balance);
        return Math.Round(bankBalance - creditBalance, 2);
    }

    public static decimal CalculateMonthlyInterestCharges(List<CreditAccount> accounts)
    {
        //TODO: add and handle simple vs compound interest
        var sum = accounts.Sum(a => (a.Balance * a.InterestRate) / 12);
        return Math.Round(sum, 2);
    }
}