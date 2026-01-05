using Server.API.Contracts;
using Server.Application.Accounts.Enums;
using Server.Application.Users.Entities;
using Server.Core.Exceptions;

namespace Server.Application.Accounts.Entities;

public class BankAccount : Account
{
    public decimal InterestRate { get; set; }
    
    protected BankAccount() { }

    public BankAccount(User user, BankAccountCreationRequest request)
    {
        Name = request.Name;
        InstitutionName = request.InstitutionName;
        if (!request.IsValidAccountType()) throw new BadRequestException("Invalid account type");
        AccountType = AccountTypeUtils.TryParse(request.AccountType)!.Value;
        User = user;
        Balance = request.Balance;
        InterestRate = request.InterestRate;
    }
}