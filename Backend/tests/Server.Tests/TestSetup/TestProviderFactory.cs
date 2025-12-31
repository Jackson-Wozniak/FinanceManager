using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Application.Users.Repositories;
using Server.Application.Users.Services;
using Server.Infrastructure.Data;

namespace Server.Tests.TestSetup;

public class TestProviderFactory
{
    public static IServiceProvider ServiceProvider()
    {
        var services = new ServiceCollection();
        
        var connection = new SqliteConnection("DataSource=:memory:");
        connection.Open();
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(connection));

        services.AddScoped<UserRepository>();
        services.AddScoped<UserTokenRepository>();
        services.AddScoped<UserService>();
        services.AddScoped<UserAuthService>();
        
        var provider = services.BuildServiceProvider();
        
        using var scope = provider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();

        return provider;
    }
}