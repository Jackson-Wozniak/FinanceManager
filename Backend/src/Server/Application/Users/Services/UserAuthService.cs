using System.IdentityModel.Tokens.Jwt;
using Server.Application.Users.Entities;
using Server.Application.Users.Repositories;
using Server.Core.Exceptions;

namespace Server.Application.Users.Services;

public class UserAuthService(UserRepository userRepository, 
    UserTokenRepository userTokenRepository, IHttpContextAccessor httpContext)
{
    public async Task<string> RegisterUserAsync(string username, string password)
    {
        if (await userRepository.FindByUsernameAsync(username) is not null)
        {
            throw new BadRequestException("User with this name already exists");
        }
        
        var hashed = BCrypt.Net.BCrypt.HashPassword(password);
        var user = new User(username, hashed);
        await userRepository.SaveAsync(user);
        var token = userTokenRepository.Generate(user.Username);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> LoginUserAsync(string username, string password)
    {
        var user = await userRepository.FindByUsernameAsync(username);
        if (user is null)
        {
            throw new NotFoundException("Cannot find user with that name");
        }
        
        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            throw new UnauthorizedException("Provided credentials are invalid");
        }
        
        var token = userTokenRepository.Generate(user.Username);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public async Task<User> GetUserByHttpContextAsync(bool doEagerLoad = true)
    {
        var username = httpContext.HttpContext?.User?.Identity?.Name;
        if (username is null)
        {
            throw new UnauthorizedException("Could not get username from token");
        }
        var user = await userRepository.FindByUsernameAsync(username, doEagerLoad);
        if (user is null)
        {
            throw new NotFoundException($"No user ({username}) found");
        }
        return user;
    }
}