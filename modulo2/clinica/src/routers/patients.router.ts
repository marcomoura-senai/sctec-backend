import { Router } from 'express';

import {
  getPatient,
  PatientController,
  updatePatient,
} from '../controller/patients.controller';

export const patientsRouter = Router();

export function patientRouterBootstrap(patientController: PatientController) {
  patientsRouter.post('/', patientController.create.bind(patientController));

  patientsRouter.get('/', patientController.list.bind(patientController));
}

patientsRouter.get('/:id', getPatient);

patientsRouter.put('/:id', updatePatient);
