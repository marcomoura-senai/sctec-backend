import express from 'express';

import { authorsRouter } from './authors.router';

export const rootRouter = express.Router();

// middleware that is specific to this router
// const timeLog = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Time: ', Date.now());
//   next();
// };

/**
 * localhost:3000/
  authors/
    criar -> localhost:3000/autor/criar
    listar
    atualizar
    deletar
    /:id -> e.g localhost:3000/authors/20
      /books -> e.g localhost:3000/authors/20/books
  books/
    POST - criar
    GET - Listar
    PUT - Atualizar
    DELETE- Deletar
 */

rootRouter.use('/authors', authorsRouter);
