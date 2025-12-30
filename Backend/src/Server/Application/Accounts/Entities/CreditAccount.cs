namespace Server.Application.Accounts.Entities;

public class CreditAccount : Account
{
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal PrincipalAmount { get; set; }
}