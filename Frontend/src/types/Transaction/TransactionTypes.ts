import type { TransactionDto } from "./TransactionDtoTypes";
import { TransactionCategory } from "./TransactionEnums";

export interface Transaction{
    message: string,
    isExpense: boolean,
    value: number,
    dateTime: Date,
    category: TransactionCategory,
}

export function fromTransactionDto(transaction: TransactionDto): Transaction{
    return {
        message: transaction.message,
        value: transaction.value,
        isExpense: transaction.isExpense,
        category: transaction.category as TransactionCategory,
        dateTime: new Date(transaction.dateTime)
    };
}

export function fromTransactionDtos(transactions: TransactionDto[]): Transaction[]{
    return transactions.map(t => fromTransactionDto(t));
}