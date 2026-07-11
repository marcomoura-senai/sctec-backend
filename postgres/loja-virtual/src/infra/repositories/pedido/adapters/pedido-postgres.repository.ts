import { Pool } from "pg";
import { Pedido } from "../../../../domain/pedido";
import { PedidoRepository } from "../pedido.repository";

export class PedidoPostgresRepository implements PedidoRepository {
  constructor(private readonly pool: Pool) {}

  async listByUserId(userId: number): Promise<Pedido[]> {
    const result = await this.pool.query(
      `
                SELECT
                	*
                FROM
                	pedido p
                JOIN item_pedido ip ON
                	p.id = ip.pedido_id
                JOIN produto pr ON
                	ip.produto_id = pr.id
                WHERE
                	p.usuario_id  = $1
            `,
      [userId],
    );

    if (result.rowCount === 0) {
      return [];
    }

    const pedidos = result.rows.reduce<Record<number, Pedido>>(
      (acc, row) => {
        const pedido = acc[row.pedido_id];

        if (!pedido) {
          acc[row.pedido_id] = {
            id: row.pedido_id,
            bairro: row.bairro,
            cidade: row.cidade,
            cep: row.cep,
            estado: row.estado,
            logradouro: row.logradouro,
            status: row.status,
            uf: row.uf,
            usuarioId: row.usuario_id,
            data: row.data,
            itemPedido: [
              {
                pedidoId: row.pedido_id,
                produtoId: row.produto_id,
                quantidade: row.quantidade,
                precoUnitario: row.preco_unitario,
                produto: {
                  id: row.produto_id,
                  nome: row.nome,
                  descricao: row.descricao,
                  precoBase: row.preco_base,
                  estoque: row.estoque,
                  categoriaId: row.categoria_id,
                },
              },
            ],
          };
          return acc;
        }

        pedido.itemPedido.push({
          pedidoId: row.pedido_id,
          produtoId: row.produto_id,
          quantidade: row.quantidade,
          precoUnitario: row.preco_unitario,
          produto: {
            categoriaId: row.categoria_id,
            descricao: row.descricao,
            estoque: row.estoque,
            id: row.produto_id,
            nome: row.nome,
            precoBase: row.preco_base,
          },
        });
        return acc;
      },
      {} as Record<number, Pedido>,
    );



    return Object.values(pedidos);
  }
}
