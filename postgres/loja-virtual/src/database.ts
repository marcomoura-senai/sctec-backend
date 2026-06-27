import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "sctec",
  password: "password123",
  port: 5432,
  max: 10,
  min: 2
});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


export async function initDatabase() {
  console.log("Iniciando banco de dados...");
  await pool.query('SELECT 1')
  console.log("Banco de dados iniciado com sucesso!");
}

