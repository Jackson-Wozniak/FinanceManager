using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Contracts;
using Server.Application.Transactions.Services;
using Server.Application.Users.Dtos;
using Server.Application.Users.Security;
using Server.Application.Users.Services;
using Server.Core.Exceptions;

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
        if (!request.IsValidCategory()) throw new BadRequestException("Invalid expense category");
        UserContext userContext = await userAuthService.GetAuthenticatedUserAsync();
        var user = await transactionService.AddTransactionAsync(userContext.UserId, request);
        return Ok(new UserDto(user));
    } 
}