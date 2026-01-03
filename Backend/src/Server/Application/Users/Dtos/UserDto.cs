using Server.Application.Accounts.Dtos;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Mappers;
using Server.Application.Users.Entities;

namespace Server.Application.Users.Dtos;

public class UserDto
{
    public string Username { get; set; }
    public List<BankAccountDto> BankAccounts { get; set; } = [];
    public List<CreditAccountDto> CreditAccounts { get; set; } = [];
    
    protected UserDto() { }

    public UserDto(User user)
    {
        Username = user.Username;
        BankAccounts = user.Accounts.OfType<BankAccount>()
            .Select(u => new BankAccountDto(u)).ToList();
        CreditAccounts = user.Accounts.OfType<CreditAccount>()
            .Select(u => new CreditAccountDto(u)).ToList();
    }
}