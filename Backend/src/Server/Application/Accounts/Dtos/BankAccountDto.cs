using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class BankAccountDto : AccountDto
{
    public decimal InterestRate { get; set; }

    public BankAccountDto(BankAccount account)
        : base(account)
    {
        InterestRate = Math.Round(account.InterestRate, 2);
    }
}