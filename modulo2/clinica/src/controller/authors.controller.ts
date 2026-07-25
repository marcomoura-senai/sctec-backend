import type { Request, Response } from 'express';

export function listAuthors(req: Request, res: Response) {
  const { nome } = req.query;

  console.log('Query params:', req.query);

  // TODO: Implementar service de busca no banco

  res.json([
    {
      id: 1,
      nome: nome,
    },
  ]);
}

export function getAuthor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    throw new Error('Id is required');
  }

  if (Number.isNaN(Number(id))) {
    throw new Error('Id must be a number');
  }

  console.log('Params:', req.params);
  res.json({
    id,
    nome: 'João Moura',
  });
}

export function createAuthor(req: Request, res: Response) {
  const body: unknown = req.body;

  console.log('Body:', body);
  res.json({
    message: 'Author created successfully',
    data: body,
  });
}

export function updateAuthor(req: Request, res: Response) {
  throw new Error('Not implemented');
}

export function deleteAuthor(req: Request, res: Response) {
  throw new Error('Not implemented');
}
