using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts;
using Server.Application.Transactions.Services;
using Server.Application.Users.Dtos;
using Server.Application.Users.Security;
using Server.Application.Users.Services;

namespace Server.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionController(UserAuthService userAuthService, 
    TransactionService transactionService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> AddTransactionAsync([FromBody] TransactionCreationRequest request)
    {
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await transactionService.AddTransactionAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    } 
}