using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Repositories;
using Server.Application.Users.Entities;
using Server.Application.Users.Services;

namespace Server.Application.Accounts.Services;

public class AccountService(UserService userService, AccountRepository accountRepository)
{
    public async Task<User> AddBankAccountAsync(long userId, BankAccountCreationRequest request)
    {
        var user = await userService.GetUserByIdAsync(userId);
        var account = new BankAccount(user, request);
        user.Accounts.Add(account);
        await accountRepository.SaveAsync(account);
        return user;
    }
    
    public async Task<User> AddRevolvingCreditAccountAsync(long userId, RevolvingCreditAccountCreationRequest request)
    {
        var user = await userService.GetUserByIdAsync(userId);
        var account = new RevolvingCreditAccount(user, request);
        user.Accounts.Add(account);
        await accountRepository.SaveAsync(account);
        return user;
    }
    
    public async Task<User> AddLoanAccountAsync(long userId, LoanAccountCreationRequest request)
    {
        var user = await userService.GetUserByIdAsync(userId);
        var account = new LoanAccount(user, request);
        user.Accounts.Add(account);
        await accountRepository.SaveAsync(account);
        return user;
    }
}