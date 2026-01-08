using Microsoft.EntityFrameworkCore;
using Server.Application.Accounts.Entities;
using Server.Infrastructure.Data;

namespace Server.Application.Accounts.Repositories;

public class AccountRepository(ApplicationDbContext context)
{
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