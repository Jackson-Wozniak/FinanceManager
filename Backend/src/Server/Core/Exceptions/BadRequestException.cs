using System.Net;

namespace Server.Core.Exceptions;

public class BadRequestException : BaseException
{
    public BadRequestException(string message) 
        : base(message, HttpStatusCode.BadRequest) { }
}