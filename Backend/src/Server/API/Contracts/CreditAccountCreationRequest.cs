using Server.Application.Accounts.Enums;

namespace Server.API.Contracts;

public class CreditAccountCreationRequest
{
    public string Name { get; set; }
    public string InstitutionName { get; set; }
    public string AccountType { get; set; }
    public decimal Balance { get; set; }
    public decimal InterestRate { get; set; }
    public int TermMonths { get; set; }
    public decimal PrincipalBalance { get; set; }

    public bool IsValidAccountType()
    {
        var type = AccountTypeUtils.TryParse(AccountType);
        return type is not null && !type.IsBankAccount();
    }
}