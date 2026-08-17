import { Router } from 'express';

import { AulaAgendadaController } from './aula-agendada.controller';

export function aulasAgendadasRouter(
  aulaAgendadaController: AulaAgendadaController,
) {
  const router = Router();

  router.get('/', aulaAgendadaController.list.bind(aulaAgendadaController));
  router.post('/', aulaAgendadaController.create.bind(aulaAgendadaController));
  router.get('/:id', aulaAgendadaController.get.bind(aulaAgendadaController));
  router.put(
    '/:id',
    aulaAgendadaController.update.bind(aulaAgendadaController),
  );
  router.delete(
    '/:id',
    aulaAgendadaController.update.bind(aulaAgendadaController),
  );

  return router;
}
