using Server.Application.Transactions.Entities;

namespace Server.Application.Transactions.Dtos;

public class TransactionDto
{
    public bool IsExpense { get; set; }
    public decimal Value { get; set; }
    public string Category { get; set; }
    public DateTimeOffset DateTime { get; set; }
    
    protected TransactionDto() { }

    public TransactionDto(Transaction transaction)
    {
        IsExpense = transaction.IsExpense;
        Value = transaction.Value;
        DateTime = transaction.DateTime;
        Category = transaction.Category;
    }
}