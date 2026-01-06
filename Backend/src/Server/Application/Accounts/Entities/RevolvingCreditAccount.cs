using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Exceptions;

namespace Server.Application.Accounts.Entities;

public class RevolvingCreditAccount : Account
{
    public decimal Balance { get; set; }
    public string Issuer { get; set; }
    public decimal InterestRate { get; set; }
    public decimal CreditLimit { get; set; }
    public override decimal Value => Balance;
    public override bool IsAsset => false;

    protected RevolvingCreditAccount() { }

    public RevolvingCreditAccount(User user, RevolvingCreditAccountCreationRequest request)
    {
        Name = request.Name;
        Issuer = request.Issuer;
        if (!request.IsValidAccountType()) throw new BadRequestException("Invalid account type");
        AccountType = AccountTypeUtils.TryParse(request.AccountType)!.Value;
        User = user;
        Balance = request.Balance;
        InterestRate = request.InterestRate;
        CreditLimit = request.CreditLimit;
    }
}