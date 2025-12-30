using Microsoft.EntityFrameworkCore;
using Server.Application.Accounts.Entities;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Account> Accounts { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<BaseEntity>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                .HasColumnType("TIMESTAMP")
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAdd();
        });
        
        modelBuilder.Entity<Account>()
            .ToTable("accounts")
            .HasOne(a => a.User)
            .WithMany(u => u.Accounts)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BankAccount>()
            .ToTable("bank_accounts");

        modelBuilder.Entity<CreditAccount>()
            .ToTable("credit_accounts");
    }
}