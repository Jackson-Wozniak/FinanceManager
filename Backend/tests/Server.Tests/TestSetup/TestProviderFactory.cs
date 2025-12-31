using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.Application.Users.Repositories;
using Server.Application.Users.Services;
using Server.Infrastructure.Data;

namespace Server.Tests.TestSetup;

public class TestProviderFactory
{
    private static readonly Dictionary<string, string?> JwtSettings = new()
    {
        { "JwtSettings:SecretKey", "THIS_IS_A_VERY_SECRET_TEST_KEY_123456" },
        { "JwtSettings:Issuer", "TestIssuer" },
        { "JwtSettings:Audience", "TestAudience" }
    };
    
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

        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(JwtSettings)
            .Build();
        services.AddSingleton(configuration);
        
        services.AddHttpContextAccessor();
        
        var provider = services.BuildServiceProvider();
        
        using var scope = provider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated();

        return provider;
    }
}