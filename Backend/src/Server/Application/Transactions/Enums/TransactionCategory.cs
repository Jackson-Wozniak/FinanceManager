namespace Server.Application.Transactions.Enums;

public enum TransactionCategory
{
    Income,
    Housing,
    Utilities,
    Transportation,
    Food,
    Health,
    Insurance,
    Debt,
    Savings,
    Entertainment,
    Subscription,
    Personal,
    Misc
}

public static class TransactionCategoryUtils
{
    public static TransactionCategory? TryParse(string category)
    {
        if (!Enum.TryParse(category, true, out TransactionCategory cat))
        {
            return null;
        }
        return cat;
    }
}