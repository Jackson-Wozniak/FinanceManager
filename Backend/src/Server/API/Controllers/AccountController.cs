using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts.AccountCreation;
using Server.Application.Accounts.Services;
using Server.Application.Users.Dtos;
using Server.Application.Users.Security;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountController(UserAuthService userAuthService, 
    AccountService accountService) : ControllerBase
{
    [HttpPost("bank")]
    public async Task<IActionResult> AddAccountAsync([FromBody] BankAccountCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await accountService.AddBankAccountAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    }
    
    [HttpPost("revolving_credit")]
    public async Task<IActionResult> AddAccountAsync([FromBody] RevolvingCreditAccountCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await accountService.AddRevolvingCreditAccountAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    }
    
    [HttpPost("loan")]
    public async Task<IActionResult> AddAccountAsync([FromBody] LoanAccountCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await accountService.AddLoanAccountAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    }
}