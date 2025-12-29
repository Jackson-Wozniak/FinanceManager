using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace Server.Core.Exceptions;

public abstract class BaseException : Exception
{
    public HttpStatusCode Status { get; set; }

    protected BaseException(string message, HttpStatusCode status) : base(message)
    {
        Status = status;
    }
}