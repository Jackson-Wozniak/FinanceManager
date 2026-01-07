using Microsoft.EntityFrameworkCore;
using Server.Application.Users.Entities;
using Server.Infrastructure.Data;

namespace Server.Application.Users.Repositories;

public class UserRepository(ApplicationDbContext context)
{
    public async Task<User?> FindByIdAsync(long id, bool eagerLoad = true)
    {
        if (eagerLoad)
        {
            return await context.Users
                .AsSplitQuery()
                .Include(u => u.Accounts)
                .ThenInclude(a => a.Transactions)
                .Include(u => u.Transactions)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
        return await context.Users.FindAsync(id);
    }
    
    public async Task<User?> FindByUsernameAsync(string username, bool eagerLoad = true)
    {
        if (eagerLoad)
        {
            return await context.Users
                .AsSplitQuery()
                .Include(u => u.Accounts)
                .ThenInclude(a => a.Transactions)
                .Include(u => u.Transactions)
                .FirstOrDefaultAsync(u => u.Username.Equals(username));
        }
        return await context.Users
            .FirstOrDefaultAsync(u => u.Username.Equals(username));
    }

    public async Task SaveAsync(User user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }
}