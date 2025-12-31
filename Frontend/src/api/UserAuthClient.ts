import type { UserTokenDto } from "../types/User/UserDtoTypes";

export async function fetchRegisterUser(username: string, password: string){
    const response = await fetch("https://localhost:7082/api/UserAuth/register", {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if(data == null || data.token == null) throw new Error("Error getting token from client");

    return data.token;
}

export async function fetchLoginUser(username: string, password: string){
    const response = await fetch("https://localhost:7082/api/UserAuth/login", {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error status: ${response.status}`);
    }

    const data = await response.json();

    if(data == null || data.token == null) throw new Error("Error getting token from client");

    return data.token;
}
