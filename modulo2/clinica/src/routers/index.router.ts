import express from 'express';

import { authorsRouter } from './authors.router';

export const rootRouter = express.Router();

// middleware that is specific to this router
// const timeLog = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Time: ', Date.now());
//   next();
// };

// Path variable -> :id
// Query parameter -> ?nome=joao&idade=25

// localhost:3000/v1/authors?nome=joao&idade=25
rootRouter.use('/authors', authorsRouter);
