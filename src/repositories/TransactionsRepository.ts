import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private getTransactionsSumByType(type: string): number {
    return this.transactions.reduce(
      (total: number, transaction: Transaction) => {
        return transaction.type === type ? transaction.value + total : total;
      },
      0,
    );
  }

  public getBalance(): Balance {
    const incomes = this.getTransactionsSumByType('income');
    const outcomes = this.getTransactionsSumByType('outcome');
    const balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
