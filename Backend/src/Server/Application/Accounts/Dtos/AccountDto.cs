using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Dtos;

public class AccountDto
{
    public string Name { get; set; }
    public string AccountType { get; set; }
    public bool IsAsset { get; set; }
    public decimal Value { get; set; }
    
    protected AccountDto() { }

    public AccountDto(Account account)
    {
        Name = account.Name;
        AccountType = account.AccountType.ToString();
        IsAsset = account.IsAsset;
        Value = Math.Round(account.Value, 2);
    }
}