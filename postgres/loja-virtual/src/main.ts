import "dotenv/config";
import { initDatabase, pool } from "./infra/database/database";
import { defer } from "./defer";
import { Pedido } from "./domain/pedido";
import { LoginUseCase } from "./use-case/login.usecase";
import { UsuarioPostgresRepository } from "./infra/repositories/usuario/adapters/usuario-postgres.repository";
import { EmailAwsService } from "./infra/email/adapters/email-aws.service";



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

  const emailService = new EmailAwsService();

  const loginUseCase = new LoginUseCase(new UsuarioPostgresRepository(pool), emailService);

  const pedidos = await getPedidos();

  const produtos = await getProdutos();

  console.log(produtos);

  // HTTP
  // const UserController = new UserController(loginUseCase);
  // View -> MVC
  
  // const loginView = new LoginView(loginUseCase);

  // await loginView.start();
}

main().catch(console.error);
