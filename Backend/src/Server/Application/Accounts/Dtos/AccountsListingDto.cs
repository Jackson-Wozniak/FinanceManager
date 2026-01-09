using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Mappers;

namespace Server.Application.Accounts.Dtos;

public class AccountsListingDto
{
    public List<BankAccountDto> BankAccounts { get; set; }
    public List<LoanAccountDto> LoanAccounts { get; set; }
    public List<RevolvingCreditAccountDto> RevolvingCreditAccounts { get; set; }
    
    protected AccountsListingDto() { }

    public AccountsListingDto(List<Account> accounts)
    {
        BankAccounts = accounts.OfType<BankAccount>().ToList().MapToDto();
        RevolvingCreditAccounts = accounts.OfType<RevolvingCreditAccount>().ToList().MapToDto();
        LoanAccounts = accounts.OfType<LoanAccount>().ToList().MapToDto();
    }
}