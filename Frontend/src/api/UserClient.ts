import type { UserDto } from "../types/User/UserDtoTypes";
import { fromUserDto, type User } from "../types/User/UserTypes";

export async function fetchGetUser(token: string): Promise<User>{
    const response = await fetch("https://localhost:7082/api/User", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error status: ${response.status}`);
    }

    const data = await response.json() as UserDto;

    if(data == null) throw new Error("Error getting user from server");

    return fromUserDto(data);
}