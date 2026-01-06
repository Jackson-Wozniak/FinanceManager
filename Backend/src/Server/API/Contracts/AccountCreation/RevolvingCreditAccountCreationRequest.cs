using Server.Application.Accounts.Enums;

namespace Server.API.Contracts.AccountCreation;

public class RevolvingCreditAccountCreationRequest
{
    public string Name { get; set; }
    public string Issuer { get; set; }
    public string AccountType { get; set; }
    public decimal Balance { get; set; }
    public decimal InterestRate { get; set; }
    public decimal CreditLimit { get; set; }

    public bool IsValidAccountType()
    {
        var type = AccountTypeUtils.TryParse(AccountType);
        return type is not null && type.IsRevolvingCreditAccount();
    }
}