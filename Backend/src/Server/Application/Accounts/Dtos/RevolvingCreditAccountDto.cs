using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class RevolvingCreditAccountDto : AccountDto
{
    public decimal Balance { get; set; }
    public string Issuer { get; set; }
    public decimal InterestRate { get; set; }
    public decimal CreditLimit { get; set; }

    public RevolvingCreditAccountDto(RevolvingCreditAccount account)
        : base(account)
    {
        Issuer = account.Issuer;
        InterestRate = Math.Round(account.InterestRate, 2);
        CreditLimit = Math.Round(account.CreditLimit, 2);
        Balance = Math.Round(account.Balance, 2);
    }
}