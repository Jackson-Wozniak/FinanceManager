using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Repositories;
using Server.Application.Users.Entities;
using Server.Application.Users.Services;
using Server.Core.Exceptions;

namespace Server.Application.Accounts.Services;

public class AccountService(UserService userService, AccountRepository accountRepository)
{
    public async Task<List<Account>> FindAccountsAsync(long userId, bool loadTransactions = true)
    {
        return await accountRepository.FindAllByUserIdAsync(userId, loadTransactions);
    }
    
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

    public async Task<Account> FindAccountByNameAsync(string name)
    {
        var account = await accountRepository.FindByNameAsync(name);
        if (account is null)
        {
            throw new NotFoundException("Cannot find matching account");
        }
        return account;
    }
}