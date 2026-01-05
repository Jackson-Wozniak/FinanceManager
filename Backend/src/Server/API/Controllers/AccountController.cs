using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Enums;
using Server.Application.Accounts.Repositories;
using Server.Application.Users.Dtos;
using Server.Application.Users.Security;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountController(UserAuthService userAuthService, UserService userService) : ControllerBase
{
    [HttpPost("bank")]
    public async Task<IActionResult> AddBankAccountAsync([FromBody] BankAccountCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await userService.AddBankAccountAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    }
    
    [HttpPost("credit")]
    public async Task<IActionResult> AddCreditAccountAsync([FromBody] CreditAccountCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await userService.AddCreditAccountAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    }
}