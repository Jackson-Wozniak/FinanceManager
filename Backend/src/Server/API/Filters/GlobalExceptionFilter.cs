using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Server.Core.Exceptions;

namespace Server.API.Filters;

public class GlobalExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is BaseException ex)
        {
            context.Result = new JsonResult(ex);
        }
        else
        {
            var exception = new ServerException(context.Exception.Message);
            context.Result = new JsonResult(exception);
        }

        context.ExceptionHandled = true;
    }
}