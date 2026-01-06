using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class LoanAccountDto : AccountDto
{
    public string Issuer { get; set; }
    public decimal Balance { get; set; }
    public decimal PrincipalBalance { get; set; }
    public int TermMonths { get; set; }
    public decimal InterestRate { get; set; }
    public bool IsCompoundInterest { get; set; }
    
    protected LoanAccountDto() { }

    public LoanAccountDto(LoanAccount account)
        : base(account)
    {
        Issuer = account.Issuer;
        Balance = account.Balance;
        PrincipalBalance = Math.Round(account.PrincipalBalance, 2);
        InterestRate = Math.Round(account.InterestRate, 2);
        TermMonths = account.TermMonths;
        IsCompoundInterest = account.IsCompoundInterest;
    }
}