import { Router } from 'express';

import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from '../controller/authors.controller';

export const authorsRouter = Router();

authorsRouter.get('/', getAuthors);

authorsRouter.get('/:id', (req, res) => {
  res.send('authors/:id');
});

authorsRouter.post('/', createAuthor);

authorsRouter.put('/:id', updateAuthor);

authorsRouter.delete('/:id', deleteAuthor);
