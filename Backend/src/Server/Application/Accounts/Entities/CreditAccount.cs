using Server.API.Contracts;
using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Exceptions;

namespace Server.Application.Accounts.Entities;

public class CreditAccount : Account
{
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal PrincipalAmount { get; set; }
    
    protected CreditAccount() { }

    public CreditAccount(User user, CreditAccountCreationRequest request)
    {
        Name = request.Name;
        InstitutionName = request.InstitutionName;
        if (!request.IsValidAccountType()) throw new BadRequestException("Invalid account type");
        AccountType = AccountTypeUtils.TryParse(request.AccountType)!.Value;
        User = user;
        Balance = request.Balance;
        InterestRate = request.InterestRate;
        TermMonths = request.TermMonths;
        PrincipalAmount = request.PrincipalBalance;
    }
}