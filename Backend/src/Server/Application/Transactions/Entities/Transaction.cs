using Server.API.Contracts;
using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Entities;
using Server.Application.Transactions.Enums;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Application.Transactions.Entities;

public class Transaction : BaseEntity
{
    public string Message { get; set; }
    public bool IsExpense { get; set; }
    public decimal Value { get; set; }
    public TransactionCategory Category { get; set; }
    public DateTimeOffset DateTime { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    public long? AccountId { get; set; }
    public Account? Account { get; set; }
    
    protected Transaction() { }

    public Transaction(TransactionCreationRequest request, User user, Account? account = null)
    {
        Message = request.Message;
        Value = request.Value;
        IsExpense = request.IsExpense;
        DateTime = request.DateTime;
        Enum.TryParse(request.Category, true, out TransactionCategory category);
        Category = category;
        User = user;
        Account = account;
    }
}