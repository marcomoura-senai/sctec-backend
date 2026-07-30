import express from 'express';

import { patientRouterBootstrap, patientsRouter } from './patients.router';
import { PatientController } from '../controller/patients.controller';
import { errorHandlerMiddleware } from '../middlewares/error-handler.middleware';
import { timeLogMiddleware } from '../middlewares/time-log.middleware';

export const rootRouter = express.Router();

// Path variable -> :id
// Query parameter -> ?nome=joao&idade=25

export function routerBootstrap(patientController: PatientController) {
  patientRouterBootstrap(patientController);
}

// localhost:3000/v1/authors?nome=joao&idade=25
rootRouter.use(
  '/patients',
  timeLogMiddleware,
  patientsRouter,
  errorHandlerMiddleware,
);
