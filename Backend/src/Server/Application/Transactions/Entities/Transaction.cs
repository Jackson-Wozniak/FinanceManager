using Server.Application.Accounts.Entities;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Application.Transactions.Entities;

public class Transaction : BaseEntity
{
    public bool IsExpense { get; set; }
    public decimal Value { get; set; }
    public string Category { get; set; }
    public DateTimeOffset DateTime { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    public long? AccountId { get; set; }
    public Account? Account { get; set; }
    
    protected Transaction() { }

    public Transaction(decimal value, DateTimeOffset time, bool expense, 
        string category, User user, Account? account = null)
    {
        Value = value;
        IsExpense = expense;
        DateTime = time;
        Category = category;
        User = user;
        Account = account;
    }
}