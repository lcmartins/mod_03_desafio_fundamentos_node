import { TransactionResponse } from './TransactionResponse';
import { BalanceResponse } from './BalanceResponse';

export interface ListTransactionsResponse {
  transactions: TransactionResponse[];
  balance: BalanceResponse;
}
