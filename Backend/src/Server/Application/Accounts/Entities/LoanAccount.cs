using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Exceptions;

namespace Server.Application.Accounts.Entities;

public class LoanAccount : Account
{
    public string Issuer { get; set; }
    public decimal Balance { get; set; }
    public decimal PrincipalBalance { get; set; }
    public int TermMonths { get; set; }
    public decimal InterestRate { get; set; }
    public bool IsCompoundInterest { get; set; }
    public override decimal Value => Balance;
    public override bool IsAsset => false;
    
    protected LoanAccount() { }

    public LoanAccount(User user, LoanAccountCreationRequest request)
    {
        Name = request.Name;
        Issuer = request.Issuer;
        if (!request.IsValidAccountType()) throw new BadRequestException("Invalid account type");
        AccountType = AccountTypeUtils.TryParse(request.AccountType)!.Value;
        User = user;
        Balance = request.Balance;
        PrincipalBalance = request.PrincipalBalance;
        InterestRate = request.InterestRate;
        TermMonths = request.TermMonths;
        IsCompoundInterest = request.IsCompoundInterest;
    }
}