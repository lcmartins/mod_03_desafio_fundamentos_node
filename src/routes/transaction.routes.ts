import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import { ListTransactionsResponse } from './responseEntities/ListTransactionsResponse';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();
const service = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const result: ListTransactionsResponse = {
      transactions,
      balance,
    };
    return response.json(result);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;
    const transaction = service.execute({
      title,
      type,
      value,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
