import "dotenv/config";
import { initDatabase, pool } from "./database";
import { defer } from "./defer";

interface Pedido {
  id: number;
  usuario_id: number;
  data: Date;
  status: string;
  logradouro: string;
  cep: string;
  bairro: string;
  uf: string;
  cidade: string | null;
  estado: string | null;
}

async function getPedidos(): Promise<Pedido[]> {
  const poolConnection = await pool.connect();

  poolConnection.query("BEGIN");

  try {
    const result = await poolConnection.query<Pedido>("SELECT * FROM pedido");

    poolConnection.query("COMMIT");

    return result.rows;
  } catch (error) {
    poolConnection.query("ROLLBACK");
    throw error;
  } finally {
    poolConnection.release();
  }
}

async function getProdutos() {
  const poolConnection = await pool.connect();

  using _ = defer(() => {
    console.log("Releasing connection");
    poolConnection.release();
  });

  return (await poolConnection.query("SELECT * FROM produto")).rows;
}

async function main() {
  await initDatabase();

  const pedidos = await getPedidos();

  const produtos = await getProdutos();

  console.log(produtos);
}

main().catch(console.error);
