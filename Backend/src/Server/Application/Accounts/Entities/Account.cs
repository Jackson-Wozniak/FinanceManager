using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Application.Accounts.Entities;

public abstract class Account : BaseEntity
{
    public string Name { get; set; }
    public string InstitutionName { get; set; }
    public AccountType AccountType { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    public decimal Balance { get; set; }
    
    protected Account() { }

    protected Account(string name, string institution, 
        AccountType type, User user, decimal balance)
    {
        Name = name;
        InstitutionName = institution;
        AccountType = type;
        User = user;
        Balance = balance;
    }
}