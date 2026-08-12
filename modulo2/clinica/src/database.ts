import 'dotenv/config';
import { DataSource } from 'typeorm';

import { Endereco } from './model/endereco.model';
import { Paciente } from './model/patient.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PASSWORD ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  poolSize: 10,
  /**
   * Só da pra utilizar em ambiente de desenvolvimento
   */
  synchronize: process.env.DB_SYNCHRONIZE?.toLowerCase() === 'true',
  /**
   * export type LogLevel = "query" | "schema" | "error" | "warn" | "info" | "log" | "migration";
   */
  logging: 'all',
  entities: [Paciente, Endereco],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  invalidWhereValuesBehavior: { undefined: 'ignore', null: 'sql-null' },
});

export async function initDatabase() {
  await AppDataSource.initialize();

  await AppDataSource.runMigrations({
    transaction: 'each',
  });
}
