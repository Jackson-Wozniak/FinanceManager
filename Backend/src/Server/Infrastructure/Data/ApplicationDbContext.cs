using Microsoft.EntityFrameworkCore;
using Server.Application.Users.Entities;
using Server.Core.Entities;

namespace Server.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var property = entityType.FindProperty(nameof(BaseEntity.CreatedAt));
            if (property == null) continue;
            
            modelBuilder.Entity(entityType.ClrType)
                .Property(nameof(BaseEntity.CreatedAt))
                .HasColumnType("TIMESTAMP")
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAdd();
        }
    }
}