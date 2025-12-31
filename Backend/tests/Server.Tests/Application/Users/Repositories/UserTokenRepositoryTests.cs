using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Application.Users.Repositories;

namespace Server.Tests.Application.Users.Repositories;

public class UserTokenRepositoryTests
{
    private readonly UserTokenRepository _tokenRepository;
    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    public UserTokenRepositoryTests()
    {
        var settings = new Dictionary<string, string?>
        {
            { "JwtSettings:SecretKey", "THIS_IS_A_VERY_SECRET_TEST_KEY_123456" },
            { "JwtSettings:Issuer", "TestIssuer" },
            { "JwtSettings:Audience", "TestAudience" }
        };
        
        IConfiguration config = new ConfigurationBuilder()
            .AddInMemoryCollection(settings)
            .Build();

        _tokenRepository = new UserTokenRepository(config);
    }

    [Fact]
    public void Generate_ReturnedToken_GeneratesValidClaims()
    {
        const string username = "user@test.com";

        var token = _tokenRepository.Generate(username);
        
        Assert.Equal("TestIssuer", token.Issuer);
        Assert.Contains("TestAudience", token.Audiences);
        
        Assert.Equal(
            username,
            token.Claims.Single(c => c.Type == ClaimTypes.Name).Value
        );
        
        Assert.True(token.ValidTo > DateTime.UtcNow);
    }
    
    [Fact]
    public void Generate_ReturnedToken_ValidatesUser()
    {
        var token = _tokenRepository.Generate("user@test.com");

        var validationParams = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "TestIssuer",
            ValidAudience = "TestAudience",
            IssuerSigningKey = new SymmetricSecurityKey(
                "THIS_IS_A_VERY_SECRET_TEST_KEY_123456"u8.ToArray()
            ),
            ClockSkew = TimeSpan.Zero
        };

        var principal = _tokenHandler.ValidateToken(
            _tokenHandler.WriteToken(token),
            validationParams,
            out _
        );

        Assert.NotNull(principal);
    }
}