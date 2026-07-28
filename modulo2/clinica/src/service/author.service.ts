export interface Author {
  id: number;
  nome: string;
  idade: number;
}

const authors: Author[] = [];

export function listAuthors(filter?: { name?: string }): Author[] {
  const { name } = filter ?? {};

  if (name) {
    return authors.filter((author) => author.nome.includes(name));
  }
  return authors;
}

export function getAuthor(id: number): Author | undefined {
  return authors.find((author) => author.id === id);
}

export function createAuthor(nome: string, idade: number): Author {
  const author = {
    id: authors.length + 1,
    nome,
    idade,
  };

  authors.push(author);

  return author;
}

export function updateAuthor(
  id: number,
  data: Partial<Omit<Author, 'id'>>,
): Author {
  const author = getAuthor(id);

  if (!author) {
    throw new Error('Author not found');
  }

  const { nome, idade } = data;

  if (nome) {
    author.nome = nome;
  }
  if (idade) {
    author.idade = idade;
  }

  return author;
}
