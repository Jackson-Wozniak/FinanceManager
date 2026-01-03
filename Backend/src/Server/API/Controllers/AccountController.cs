using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts;
using Server.Application.Accounts.Entities;
using Server.Application.Accounts.Enums;
using Server.Application.Accounts.Repositories;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AccountController(
    UserAuthService userAuthService, AccountRepository repository,
    UserService userService) : ControllerBase
{
    // [HttpPost("bank")]
    // public async Task<IActionResult> AddBankAccountAsync([FromBody] BankAccountCreationRequest request)
    // {
    //     var userId = await userAuthService.GetAuthenticatedUserAsync();
    //     var user = await userService.GetUserById(userId.UserId);
    //     
    //     var account = new BankAccount
    //     {
    //         Name = "Temp",
    //         InstitutionName = "Temp Institution",
    //         AccountType = AccountType.Checking,
    //         User = user,
    //         Balance = new decimal(0.0),
    //         InterestRate = new decimal(0.0)
    //     };
    //     await repository.SaveAsync(account);
    //     return Ok();
    // }
}