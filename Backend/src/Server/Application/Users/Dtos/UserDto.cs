using Server.Application.Accounts.Dtos;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Mappers;
using Server.Application.Accounts.Utils;
using Server.Application.Users.Entities;

namespace Server.Application.Users.Dtos;

public class UserDto
{
    public string Username { get; set; }
    public decimal NetWorth { get; set; }
    public decimal EstimatedMonthlyInterestCharges { get; set; }
    public List<BankAccountDto> BankAccounts { get; set; } = [];
    public List<CreditAccountDto> CreditAccounts { get; set; } = [];
    
    protected UserDto() { }

    public UserDto(User user)
    {
        Username = user.Username;
        var bankAccounts = user.Accounts.OfType<BankAccount>().ToList();
        BankAccounts = bankAccounts.Select(u => new BankAccountDto(u)).ToList();
        var creditAccounts = user.Accounts.OfType<CreditAccount>().ToList();
        CreditAccounts = creditAccounts.Select(u => new CreditAccountDto(u)).ToList();
        NetWorth = AccountCalculations.CalculateNetWorth(bankAccounts, creditAccounts);
        EstimatedMonthlyInterestCharges = AccountCalculations.CalculateMonthlyInterestCharges(creditAccounts);
    }
}