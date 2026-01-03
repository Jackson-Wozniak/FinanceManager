import type { NewBankAccountDto } from "../types/Account/AccountDtoTypes";
import type { UserDto } from "../types/User/UserDtoTypes";
import { fromUserDto, type User } from "../types/User/UserTypes";

export async function fetchCreateBankAccount(token: string, account: NewBankAccountDto): Promise<User>{
    const response = await fetch("", {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as UserDto;

    if(data == null){
        throw new Error("Error getting user from server");
    }

    return fromUserDto(data);
}