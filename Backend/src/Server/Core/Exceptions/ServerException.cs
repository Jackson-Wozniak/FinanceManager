using System.Net;

namespace Server.Core.Exceptions;

public class ServerException : BaseException
{
    public ServerException(string message) 
        : base(message, HttpStatusCode.InternalServerError) { }
}