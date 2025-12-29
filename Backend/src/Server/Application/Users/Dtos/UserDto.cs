using Server.Application.Users.Entities;

namespace Server.Application.Users.Dtos;

public class UserDto
{
    public string Username { get; set; }
    
    protected UserDto() { }

    public UserDto(User user)
    {
        Username = user.Username;
    }
}