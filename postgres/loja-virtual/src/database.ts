import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 10,
  min: 2,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function initDatabase() {
  console.log("Iniciando banco de dados...");
  await pool.query("SELECT 1");
  console.log("Banco de dados iniciado com sucesso!");
}
