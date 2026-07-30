import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import { PatientController } from './controller/patients.controller';
import { AppDataSource, initDatabase } from './database';
import { Paciente } from './model/patient.model';
import { PatientTypeOrmRepository } from './repositories/paciente.repository';
import { routerBootstrap, rootRouter } from './routers/index.router';
import { PatientService } from './service/patient.service';

// <PROTOCOLO><HOST/IP>:<PORT>/<CAMINHO>
// http://localhost:3000/v1/
// http://localhost:3000/b
// http://localhost:3000/c <- URL/ URI (Unique Resource Identifier -> Identificador Único de Recurso)
async function main() {
  const app = express();

  await initDatabase();

  const patientRepository = new PatientTypeOrmRepository(
    AppDataSource.getRepository(Paciente),
  );

  const patientService = new PatientService(patientRepository);

  const patientController = new PatientController(patientService);

  routerBootstrap(patientController);

  const port = process.env.PORT ?? 3000;
  app.use(express.json({ limit: '50mb' }));

  app.use('/v1', rootRouter);

  app.listen(port, () => {
    console.log(`Listening on port ${port.toString()}`);
  });
}

main().catch(console.error);
