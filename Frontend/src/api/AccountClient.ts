import type { AccountsListingDto, BankAccountDto, LoanAccountDto, RevolvingCreditAccountDto } from "../types/Account/AccountDtoTypes";
import { fromAccountsListingDto, type AccountsListing } from "../types/Account/AccountTypes";

export async function fetchGetAccountsListing(token: string): Promise<AccountsListing>{
    const response = await fetch("https://localhost:7082/api/Account", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as AccountsListingDto;

    if(data == null){
        throw new Error("Error getting accounts listing from server");
    }

    return fromAccountsListingDto(data);
}

export async function fetchCreateBankAccount(token: string, account: BankAccountDto): Promise<AccountsListing>{
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

    const data = await response.json() as AccountsListing;

    if(data == null){
        throw new Error("Error getting user from server");
    }

    return fromAccountsListingDto(data);
}

export async function fetchCreateRevolvingCreditAccount(token: string, account: RevolvingCreditAccountDto): Promise<AccountsListing>{
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

    const data = await response.json() as AccountsListing;

    if(data == null){
        throw new Error("Error getting user from server");
    }

    return fromAccountsListingDto(data);
}

export async function fetchCreateLoanAccount(token: string, account: LoanAccountDto): Promise<AccountsListing>{
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

    const data = await response.json() as AccountsListing;

    if(data == null){
        throw new Error("Error getting user from server");
    }

    return fromAccountsListingDto(data);
}