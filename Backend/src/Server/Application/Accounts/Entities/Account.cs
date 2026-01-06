using System.ComponentModel.DataAnnotations.Schema;
using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Application.Accounts.Entities;

public abstract class Account : BaseEntity
{
    public string Name { get; set; }
    public AccountType AccountType { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
    [NotMapped]
    public abstract decimal Value { get; }
    [NotMapped]
    public abstract bool IsAsset { get; }
    
    protected Account() { }

    protected Account(string name, AccountType type, User user)
    {
        Name = name;
        AccountType = type;
        User = user;
    }
}