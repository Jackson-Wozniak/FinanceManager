using System.Net;

namespace Server.Core.Exceptions;

public class UnauthorizedException : BaseException
{
    public UnauthorizedException(string message)
        : base(message, HttpStatusCode.Unauthorized) { }
}