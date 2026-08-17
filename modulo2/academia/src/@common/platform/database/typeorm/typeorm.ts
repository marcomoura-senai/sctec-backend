import 'dotenv/config';
import { DataSource, LoggerOptions } from 'typeorm';

import { SnakeCaseNamingStrategy } from './snake-case-naming-pattern';
import { AulaAgendada } from '../../../../aulas-agendadas/aula-agendada.entity';
import { Aluno } from '../../../entities/aluno.entity';
import { Instrutor } from '../../../entities/instrutor.entity';

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
  logging: (process.env.DB_LOG_LEVEL ?? 'error') as LoggerOptions,
  entities: [Aluno, Instrutor, AulaAgendada],
  namingStrategy: new SnakeCaseNamingStrategy(),
  migrations: [import.meta.dirname + '/migrations/**/*{.js,.ts}'],
  invalidWhereValuesBehavior: { undefined: 'ignore', null: 'sql-null' },
});

export async function initDatabase() {
  await AppDataSource.initialize();

  await AppDataSource.runMigrations({
    transaction: 'each',
  });
}
