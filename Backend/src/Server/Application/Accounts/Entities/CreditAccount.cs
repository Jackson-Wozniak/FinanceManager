using Server.API.Contracts;
using Server.Application.Users.Entities;

namespace Server.Application.Accounts.Entities;

public class CreditAccount : Account
{
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal PrincipalAmount { get; set; }
    
    protected CreditAccount() { }

    public CreditAccount(User user, CreditAccountCreationRequest request)
    {
        
    }
}