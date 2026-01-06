using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class AccountDto
{
    public string Name { get; set; }
    public string AccountType { get; set; }
    
    protected AccountDto() { }

    public AccountDto(Account account)
    {
        Name = account.Name;
        AccountType = account.AccountType.ToString();
    }
}