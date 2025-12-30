using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class CreditAccountDto : AccountDto
{
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal PrincipalAmount { get; set; }

    public CreditAccountDto(CreditAccount account)
        : base(account)
    {
        InterestRate = Math.Round(account.InterestRate, 2);
        TermMonths = account.TermMonths;
        PrincipalAmount = Math.Round(account.PrincipalAmount, 2);
    }
}