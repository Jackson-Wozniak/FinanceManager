using Server.Application.Accounts.Dtos;
using Server.Application.Accounts.Entities;

namespace Server.Application.Accounts.Mappers;

public static class AccountDtoMapper
{
    public static BankAccountDto MapToDto(this BankAccount account)
    {
        return new BankAccountDto(account);
    }
    
    public static RevolvingCreditAccountDto MapToDto(this RevolvingCreditAccount account)
    {
        return new RevolvingCreditAccountDto(account);
    }
    
    public static LoanAccountDto MapToDto(this LoanAccount account)
    {
        return new LoanAccountDto(account);
    }

    public static List<BankAccountDto> MapToDto(this IEnumerable<BankAccount> accounts)
    {
        return accounts.Select(MapToDto).ToList();
    }
    
    public static List<RevolvingCreditAccountDto> MapToDto(this IEnumerable<RevolvingCreditAccount> accounts)
    {
        return accounts.Select(MapToDto).ToList();
    }
    
    public static List<LoanAccountDto> MapToDto(this IEnumerable<LoanAccount> accounts)
    {
        return accounts.Select(MapToDto).ToList();
    }
}