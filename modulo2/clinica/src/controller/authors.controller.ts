import type { Request, Response } from 'express';

export function getAuthors(req: Request, res: Response) {
  const { nome } = req.query;

  console.log('Nome: ', nome);

  // TODO: Implementar service de busca no banco

  res.json([
    {
      id: 1,
      nome: nome,
    },
  ]);
}

export function createAuthor(req: Request, res: Response) {
  throw new Error('Not implemented');
}

export function updateAuthor(req: Request, res: Response) {
  throw new Error('Not implemented');
}

export function deleteAuthor(req: Request, res: Response) {
  throw new Error('Not implemented');
}
