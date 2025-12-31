using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts;
using Server.Application.Users.Security;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserAuthController(UserAuthService userAuthService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] CredentialsRequest request)
    {
        UserTokenContext token = await userAuthService.RegisterUserAsync(
            request.Username, request.Password);
        return Ok(token);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] CredentialsRequest request)
    {
        UserTokenContext token = await userAuthService.LoginUserAsync(
            request.Username, request.Password);
        return Ok(token);
    }
}