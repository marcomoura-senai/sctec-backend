import express from 'express';

import { authorsRouter } from './authors.router';
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware';
import { timeLogMiddleware } from '../middlewares/time-log.middleware';

export const rootRouter = express.Router();

// Path variable -> :id
// Query parameter -> ?nome=joao&idade=25

// localhost:3000/v1/authors?nome=joao&idade=25
rootRouter.use(
  '/authors',
  timeLogMiddleware,
  authorsRouter,
  errorHandlerMiddleware,
);
