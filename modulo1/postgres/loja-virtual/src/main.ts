import "dotenv/config";
import { initDatabase, pool } from "./infra/database/database";
import { defer } from "./defer";
import { LoginUseCase } from "./use-case/login.usecase";
import { UsuarioPostgresRepository } from "./infra/repositories/usuario/adapters/usuario-postgres.repository";
import { EmailAwsService } from "./infra/email/adapters/email-aws.service";
import { FindUserUseCase } from "./use-case/find-user.uc";
import { PedidoPostgresRepository } from "./infra/repositories/pedido/adapters/pedido-postgres.repository";
import { FindUserOrdersUseCase } from "./use-case/find-user-orders.uc";



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

  const findUserUseCase = new FindUserUseCase(new UsuarioPostgresRepository(pool));
  const findUserOrdersUseCase = new FindUserOrdersUseCase(new PedidoPostgresRepository(pool));


  // const produtos = await getProdutos();

  await loginUseCase.execute('123456', '123456').catch(console.error);

  const USER_ID = 4;
  const user = await findUserUseCase.execute(USER_ID)
  console.log('USER: ', user);


  const orders = await findUserOrdersUseCase.execute(USER_ID)
  console.log('ORDERS: ', JSON.stringify(orders, null, 2));


}

main().catch(console.error);
