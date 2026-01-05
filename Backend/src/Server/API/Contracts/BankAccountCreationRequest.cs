using Server.Application.Accounts.Enums;

namespace Server.API.Contracts;

public class BankAccountCreationRequest
{
    public string Name { get; set; }
    public string InstitutionName { get; set; }
    public string AccountType { get; set; }
    public decimal Balance { get; set; }
    public decimal InterestRate { get; set; }

    public bool IsValidAccountType()
    {
        var type = AccountTypeUtils.TryParse(AccountType);
        return type is not null && type.IsBankAccount();
    }
}