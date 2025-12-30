using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Users.Dtos;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController(UserService userService, UserAuthService userAuthService)
    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUserAsync()
    {
        var userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await userService.GetUserById(userContext.UserId);
        return Ok(new UserDto(user));
    }
}