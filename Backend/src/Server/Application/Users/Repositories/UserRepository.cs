using Microsoft.EntityFrameworkCore;
using Server.Application.Users.Entities;
using Server.Infrastructure.Data;

namespace Server.Application.Users.Repositories;

public class UserRepository(ApplicationDbContext context)
{
    public async Task<User?> FindByIdAsync(long id, bool eagerLoad = false)
    {
        if (!eagerLoad)
        {
            return await context.Users.FindAsync(id);
        }
        return await context.Users
            .FirstOrDefaultAsync(u => u.Id == id);
    }
    
    public async Task<User?> FindByUsernameAsync(string username, bool eagerLoad = false)
    {
        if (!eagerLoad)
        {
            return await context.Users
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
}