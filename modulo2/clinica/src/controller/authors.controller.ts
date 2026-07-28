import type { Request, Response } from 'express';

import * as authorService from '../service/author.service';

export function listAuthors(req: Request, res: Response) {
  const { nome } = req.query;

  if (nome && typeof nome !== 'string') {
    return res.status(400).json({
      message: 'query param "nome" must be a string',
    });
  }

  const authors = authorService.listAuthors({ name: nome });

  res.json(authors);
}

export function getAuthor(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  const author = authorService.getAuthor(Number(id));

  if (!author) {
    return res.status(404).json({
      message: 'Author not found',
    });
  }

  res.json(author);
}

export function createAuthor(req: Request, res: Response) {
  const body: unknown = req.body;

  if (!body) {
    return res.status(400).json({
      message: 'Body is required',
    });
  }

  if (typeof body !== 'object') {
    return res.status(400).json({
      message: 'Body must be an object',
    });
  }

  if (!('nome' in body) || typeof body.nome !== 'string') {
    return res.status(400).json({
      message: 'property "nome" is required and must be a string',
    });
  }

  if (!('idade' in body) || typeof body.idade !== 'number') {
    return res.status(400).json({
      message: 'property "idade" is required and must be a number',
    });
  }

  const author = authorService.createAuthor(body.nome, body.idade);

  res.status(201).json({
    message: 'Author created successfully',
    data: author,
  });
}

export function updateAuthor(req: Request, res: Response) {
  const body: unknown = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  if (!body) {
    return res.status(400).json({
      message: 'Body is required',
    });
  }

  if (typeof body !== 'object') {
    return res.status(400).json({
      message: 'Body must be an object',
    });
  }

  if ('nome' in body && typeof body.nome !== 'string') {
    return res.status(400).json({
      message: 'property "nome" must be a string',
    });
  }

  if ('idade' in body && typeof body.idade !== 'number') {
    return res.status(400).json({
      message: 'property "idade" must be a number',
    });
  }

  try {
    const author = authorService.updateAuthor(Number(id), body);

    res.status(201).json({
      message: 'Author updated successfully',
      data: author,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Author not found') {
        return res.status(404).json({
          message: 'Author not found',
        });
      }
    }
    throw error;
  }
}
