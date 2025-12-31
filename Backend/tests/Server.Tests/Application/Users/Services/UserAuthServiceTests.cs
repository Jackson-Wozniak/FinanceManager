using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Server.Application.Users.Entities;
using Server.Application.Users.Repositories;
using Server.Application.Users.Services;
using Server.Core.Exceptions;
using Server.Tests.TestSetup;

namespace Server.Tests.Application.Users.Services;

public class UserAuthServiceTests
{
    private readonly JwtSecurityTokenHandler _tokenHandler = new();
    
    [Fact]
    public async Task RegisterUserAsync_NewUsername_SavesUserAndReturnsToken()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();
        var userRepository = scope.ServiceProvider.GetRequiredService<UserRepository>();

        const string username = "user@test.com";
        const string password = "testPassword";

        var tokenString = await userAuthService.RegisterUserAsync(username, password);

        var user = await userRepository.FindByUsernameAsync(username);
        Assert.NotNull(user);
        Assert.Equal(username, user.Username);
        
        var token = _tokenHandler.ReadJwtToken(tokenString.Token);
        var tokenUsername = token.Claims.Single(c => c.Type == ClaimTypes.Name).Value;
        Assert.Equal(username, tokenUsername);
        Assert.True(token.ValidTo > DateTime.UtcNow);
        Assert.NotNull(await userRepository.FindByUsernameAsync(tokenUsername));
    }

    [Fact]
    public async Task RegisterUserAsync_ExistingUsername_ThrowsException()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();
        var userRepository = scope.ServiceProvider.GetRequiredService<UserRepository>();

        const string username = "user@test.com";
        const string password = "testPassword";

        await userRepository.SaveAsync(new User(username, password));

        var ex = await Assert.ThrowsAsync<BadRequestException>(
            async () => await userAuthService.RegisterUserAsync(username, password));
        Assert.Equal("User with this name already exists", ex.Message);
    }
    
    [Fact]
    public async Task LoginUserAsync_ExistingUsername_ReturnsTokenString()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();

        const string username = "user@test.com";
        const string password = "testPassword";

        await userAuthService.RegisterUserAsync(username, password);
        var tokenString = await userAuthService.LoginUserAsync(username, password);
        var token = _tokenHandler.ReadJwtToken(tokenString.Token);
        
        Assert.Equal(username, token.Claims.Single(c => c.Type == ClaimTypes.Name).Value);
    }
    
    [Fact]
    public async Task LoginUserAsync_AbsentUsername_ThrowsException()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();

        const string username = "user@test.com";
        const string password = "testPassword";

        var ex = await Assert.ThrowsAsync<NotFoundException>(
            async () => await userAuthService.LoginUserAsync(username, password));
        Assert.Equal("Cannot find user with that name", ex.Message);
    }
    
    [Fact]
    public async Task LoginUserAsync_IncorrectPassword_ThrowsException()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();

        const string username = "user@test.com";
        const string password = "testPassword";

        await userAuthService.RegisterUserAsync(username, password);
        
        var ex = await Assert.ThrowsAsync<UnauthorizedException>(
            async () => await userAuthService.LoginUserAsync(username,"incorrect password"));
        Assert.Equal("Provided credentials are invalid", ex.Message);
    }
    
    [Fact]
    public async Task GetAuthenticatedUserAsync_ExistingUser_ReturnsId()
    {
        var provider = TestProviderFactory.ServiceProvider();
        var scope = provider.CreateScope();
        var userAuthService = scope.ServiceProvider.GetRequiredService<UserAuthService>();
        var userRepository = scope.ServiceProvider.GetRequiredService<UserRepository>();
        var httpContextAccessor = scope.ServiceProvider.GetRequiredService<IHttpContextAccessor>();
        
        const string username = "user@test.com";
        const string password = "testPassword";

        var tokenString = await userAuthService.RegisterUserAsync(username, password);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.NameIdentifier, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var httpContext = new DefaultHttpContext
        {
            User = new ClaimsPrincipal(
                new ClaimsIdentity(claims, "TestAuth")
            )
        };
        httpContextAccessor.HttpContext = httpContext;

        var user = await userRepository.FindByUsernameAsync(username);
        var userContext = await userAuthService.GetAuthenticatedUserAsync();

        Assert.NotNull(user);
        Assert.Equal(user.Id, userContext.UserId);
    }
}