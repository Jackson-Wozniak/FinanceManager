using Server.Application.Transactions.Entities;

namespace Server.Application.Transactions.Dtos;

public class TransactionDto
{
    public string Message { get; set; }
    public bool IsExpense { get; set; }
    public decimal Value { get; set; }
    public string Category { get; set; }
    public DateTimeOffset DateTime { get; set; }
    
    protected TransactionDto() { }

    public TransactionDto(Transaction transaction)
    {
        Message = transaction.Message;
        IsExpense = transaction.IsExpense;
        Value = Math.Round(transaction.Value, 2);
        DateTime = transaction.DateTime;
        Category = transaction.Category.ToString();
    }
}