import type { TransactionDto } from "./TransactionDtoTypes";

export interface Transaction{
    message: string,
    isExpense: boolean,
    value: number,
    dateTime: Date,
    category: string,
}

export function fromTransactionDto(transaction: TransactionDto): Transaction{
    return {
        message: transaction.message,
        value: transaction.value,
        isExpense: transaction.isExpense,
        category: transaction.category,
        dateTime: new Date(transaction.dateTime)
    };
}

export function fromTransactionDtos(transactions: TransactionDto[]): Transaction[]{
    return transactions.map(t => fromTransactionDto(t));
}