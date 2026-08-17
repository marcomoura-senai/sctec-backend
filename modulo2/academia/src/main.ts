import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import {
  AppDataSource,
  initDatabase,
} from './@common/platform/database/typeorm/typeorm';
import { setupRoutes } from './@common/platform/express/routers/root.router';
import { AulaAgendadaController } from './aulas-agendadas/aula-agendada.controller';
import { AulaAgendada } from './aulas-agendadas/aula-agendada.entity';
import { AulaAgendadaTypeOrmRepository } from './aulas-agendadas/repositories/aula-agendada-typeorm.repository';
import { CriarAulaUC } from './aulas-agendadas/usecases/criar-aula.uc';
import { GetAulaUC } from './aulas-agendadas/usecases/get-aula.uc';
import { ListarAulasUC } from './aulas-agendadas/usecases/listar-aulas.uc';

function appBootstrap(app: ReturnType<typeof express>) {
  const aulaAgendadaRepository = new AulaAgendadaTypeOrmRepository(
    AppDataSource.getRepository(AulaAgendada),
  );

  const aulaAgendadaController = new AulaAgendadaController(
    new CriarAulaUC(aulaAgendadaRepository),
    new ListarAulasUC(aulaAgendadaRepository),
    new GetAulaUC(aulaAgendadaRepository),
  );

  app.use(
    setupRoutes({
      aac: aulaAgendadaController,
    }),
  );
}

async function main() {
  const app = express();

  await initDatabase();

  app.use(express.json({ limit: '50mb' }));
  appBootstrap(app);

  const port = process.env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port.toString()}`);
  });
}

await main();
