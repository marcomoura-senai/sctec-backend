import { Router } from 'express';

import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  listAuthors,
  updateAuthor,
} from '../controller/authors.controller';

export const authorsRouter = Router();

authorsRouter.get('/', listAuthors);

authorsRouter.get('/:id', getAuthor);

authorsRouter.post('/', createAuthor);

authorsRouter.put('/:id', updateAuthor);

authorsRouter.delete('/:id', deleteAuthor);
