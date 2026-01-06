using Server.Application.Transactions.Entities;
using Server.Infrastructure.Data;

namespace Server.Application.Transactions.Repositories;

public class TransactionRepository(ApplicationDbContext context)
{
    public async Task<Transaction> SaveAsync(Transaction transaction)
    {
        await context.AddAsync(transaction);
        await context.SaveChangesAsync();
        return transaction;
    }
}