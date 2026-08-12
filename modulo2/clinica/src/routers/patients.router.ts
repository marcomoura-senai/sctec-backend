import { Router } from 'express';

import { PatientController } from '../controller/patients.controller';

export const patientsRouter = Router();

export function patientRouterBootstrap(patientController: PatientController) {
  patientsRouter.post('/', patientController.create.bind(patientController));

  patientsRouter.get('/', patientController.list.bind(patientController));

  patientsRouter.get(
    '/:id',
    patientController.getPatient.bind(patientController),
  );

  patientsRouter.put(
    '/:id',
    patientController.updatePatient.bind(patientController),
  );
}
