using Server.Application.Accounts.Entities;
using Server.Application.Transactions.Entities;
using Server.Core.Entities;

namespace Server.Application.Users.Entities;

public class User : BaseEntity
{
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public List<Account> Accounts { get; set; } = [];
    public List<Transaction> Transactions { get; set; } = [];
    
    protected User() { }

    public User(string username, string passwordHash)
    {
        Username = username;
        PasswordHash = passwordHash;
    }
}