import type { NewBankAccountDto, NewCreditAccountDto } from "../types/Account/AccountDtoTypes";
import type { UserDto } from "../types/User/UserDtoTypes";
import { fromUserDto, type User } from "../types/User/UserTypes";

export async function fetchCreateBankAccount(token: string, account: NewBankAccountDto): Promise<User>{
    const response = await fetch("https://localhost:7082/api/Account/bank", {
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

export async function fetchCreateCreditAccount(token: string, account: NewCreditAccountDto): Promise<User>{
    const response = await fetch("https://localhost:7082/api/Account/credit", {
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