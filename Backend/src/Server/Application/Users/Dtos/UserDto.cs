using Server.Application.Accounts.Dtos;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Mappers;
using Server.Application.Accounts.Utils;
using Server.Application.Transactions.Dtos;
using Server.Application.Users.Entities;

namespace Server.Application.Users.Dtos;

public class UserDto
{
    public string Username { get; set; }
    public decimal NetWorth { get; set; }
    public decimal EstimatedMonthlyLoanPayments { get; set; }
    public List<BankAccountDto> BankAccounts { get; set; } = [];
    public List<RevolvingCreditAccountDto> RevolvingCreditAccounts { get; set; } = [];
    public List<LoanAccountDto> LoanAccounts { get; set; } = [];
    public List<TransactionDto> Transactions { get; set; } = [];
    
    protected UserDto() { }

    public UserDto(User user)
    {
        Username = user.Username;
        BankAccounts = user.Accounts.OfType<BankAccount>().ToList().MapToDto();
        RevolvingCreditAccounts = user.Accounts.OfType<RevolvingCreditAccount>().ToList().MapToDto();
        LoanAccounts = user.Accounts.OfType<LoanAccount>().ToList().MapToDto();
        NetWorth = AccountCalculations.CalculateNetWorth(user.Accounts);
        EstimatedMonthlyLoanPayments = AccountCalculations.CalculateMonthlyLoanPayments(user.Accounts.OfType<LoanAccount>().ToList());
        Transactions = user.Transactions.Select(t => new TransactionDto(t)).ToList();
    }
}