using System.Net;

namespace Server.Core.Exceptions;

public class NotFoundException : BaseException
{
    public NotFoundException(string message) 
        : base(message, HttpStatusCode.NotFound) { }
}