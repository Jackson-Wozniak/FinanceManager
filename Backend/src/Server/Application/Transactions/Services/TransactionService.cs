using Server.API.Contracts;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Services;
using Server.Application.Transactions.Entities;
using Server.Application.Transactions.Repositories;
using Server.Application.Users.Entities;
using Server.Application.Users.Services;
using Server.Core.Exceptions;

namespace Server.Application.Transactions.Services;

public class TransactionService(TransactionRepository transactionRepository,
    UserService userService, AccountService accountService)
{
    public async Task<User> AddTransactionAsync(long userId, TransactionCreationRequest request)
    {
        var user = await userService.GetUserByIdAsync(userId);
        Account? account = null;
        if (request.AccountName is not null)
        {
            account = await accountService.FindAccountByNameAsync(request.AccountName);
        }
        var transaction = new Transaction(request, user, account);
        user.Transactions.Add(transaction);
        account?.Transactions.Add(transaction);
        await transactionRepository.SaveAsync(transaction);
        return user;
    }
}