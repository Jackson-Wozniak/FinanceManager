using Server.API.Contracts;
using Server.Application.Accounts.Entities;
using Server.Application.Users.Entities;
using Server.Application.Users.Repositories;
using Server.Core.Exceptions;

namespace Server.Application.Users.Services;

public class UserService(UserRepository userRepository)
{
    public async Task<User> GetUserByIdAsync(long userId)
    {
        var user = await userRepository.FindByIdAsync(userId, true);
        
        if (user is null) 
            throw new NotFoundException($"No user found");

        return user;
    }

    public async Task<User> AddBankAccountAsync(long userId, BankAccountCreationRequest request)
    {
        var user = await GetUserByIdAsync(userId);
        var account = new BankAccount(user, request);
        user.Accounts.Add(account);
        await userRepository.SaveChangesAsync();
        return user;
    }
    
    public async Task<User> AddCreditAccountAsync(long userId, CreditAccountCreationRequest request)
    {
        var user = await GetUserByIdAsync(userId);
        var account = new CreditAccount(user, request);
        user.Accounts.Add(account);
        await userRepository.SaveChangesAsync();
        return user;
    }
}