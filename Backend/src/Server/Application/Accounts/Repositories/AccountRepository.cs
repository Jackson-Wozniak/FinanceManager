using Microsoft.EntityFrameworkCore;
using Server.Application.Accounts.Entities;
using Server.Infrastructure.Data;

namespace Server.Application.Accounts.Repositories;

public class AccountRepository(ApplicationDbContext context)
{
    public async Task<List<Account>> FindAllByUserIdAsync(long userId, bool loadTransactions = true)
    {
        if (loadTransactions)
        {
            return await context.Accounts
                .Include(a => a.Transactions)
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }
        return await context.Accounts
            .Where(a => a.UserId == userId)
            .ToListAsync();
    }
    
    public async Task SaveAsync(Account account)
    {
        await context.AddAsync(account);
        await context.SaveChangesAsync();
    }

    public async Task<Account?> FindByNameAsync(string name)
    {
        return await context.Accounts
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync(a => a.Name.Equals(name));
    }
}