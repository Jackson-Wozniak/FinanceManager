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
    public decimal EstimatedMonthlyLoanPayments { get; set; }
    public List<AccountDto> Accounts { get; set; } = [];
    
    protected UserDto() { }

    public UserDto(User user)
    {
        Username = user.Username;
        Accounts = user.Accounts.MapToDto();
        NetWorth = AccountCalculations.CalculateNetWorth(user.Accounts);
        EstimatedMonthlyLoanPayments = AccountCalculations.CalculateMonthlyLoanPayments(user.Accounts.OfType<LoanAccount>().ToList());
    }
}