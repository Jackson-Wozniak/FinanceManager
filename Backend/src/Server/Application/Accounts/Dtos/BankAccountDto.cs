using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class BankAccountDto : AccountDto
{
    public decimal Balance { get; set; }
    public string BankName { get; set; }
    public decimal InterestRate { get; set; }

    public BankAccountDto(BankAccount account)
        : base(account)
    {
        Balance = account.Balance;
        BankName = account.BankName;
        InterestRate = Math.Round(account.InterestRate, 2);
    }
}