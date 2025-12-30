using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class AccountDto
{
    public string Name { get; set; }
    public string InstitutionName { get; set; }
    public string AccountType { get; set; }
    public decimal Balance { get; set; }
    
    protected AccountDto() { }

    public AccountDto(Account account)
    {
        Name = account.Name;
        InstitutionName = account.InstitutionName;
        AccountType = account.AccountType.ToString();
        Balance = Math.Round(account.Balance, 2);
    }
}