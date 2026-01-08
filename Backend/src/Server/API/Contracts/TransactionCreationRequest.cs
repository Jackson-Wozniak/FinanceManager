namespace Server.API.Contracts;

public class TransactionCreationRequest
{
    public string Message { get; set; }
    public bool IsExpense { get; set; }
    public decimal Value { get; set; }
    public string Category { get; set; }
    public DateTimeOffset DateTime { get; set; }
    public string? AccountName { get; set; }
}