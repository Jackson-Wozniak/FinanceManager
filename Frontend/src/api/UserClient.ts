import type { UserDto } from "../types/User/UserDtoTypes";

export async function fetchGetUser(token: string): Promise<UserDto>{
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

    if(data == null) throw new Error("Error getting token from client");

    return data;
}