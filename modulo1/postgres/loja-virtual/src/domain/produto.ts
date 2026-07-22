export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    precoBase: number;
    estoque: number;
    categoriaId: number;
}