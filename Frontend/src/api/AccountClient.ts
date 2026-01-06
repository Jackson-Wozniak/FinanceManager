import type { BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "../types/Account/AccountDtoTypes";
import type { UserDto } from "../types/User/UserDtoTypes";
import { fromUserDto, type User } from "../types/User/UserTypes";

export async function fetchCreateBankAccount(token: string, account: BankAccountDto): Promise<User>{
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

export async function fetchCreateRevolvingCreditAccount(token: string, account: RevolvingCreditAccountDto): Promise<User>{
    const response = await fetch("https://localhost:7082/api/Account/revolving_credit", {
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

export async function fetchCreateLoanAccount(token: string, account: LoanAccountDto): Promise<User>{
    const response = await fetch("https://localhost:7082/api/Account/loan", {
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