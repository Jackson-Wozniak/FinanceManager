using Server.Application.Accounts.Dtos;
using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Mappers;

public static class AccountDtoMapper
{
    public static AccountDto MapToDto(this Account account)
    {
        return account switch
        {
            BankAccount b => new BankAccountDto(b),
            CreditAccount c => new CreditAccountDto(c),
            _ => new AccountDto(account)
        };
    }

    public static List<AccountDto> MapToDto(this IEnumerable<Account> accounts)
    {
        return accounts.Select(MapToDto).ToList();
    }
}