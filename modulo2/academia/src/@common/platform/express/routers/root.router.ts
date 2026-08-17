import { Router } from 'express';

import { AulaAgendadaController } from '../../../../aulas-agendadas/aula-agendada.controller';
import { aulasAgendadasRouter } from '../../../../aulas-agendadas/aula-agendada.router';

interface Controllers {
  aac: AulaAgendadaController;
}

export function setupRoutes(controllers: Controllers) {
  const router = Router();

  router.use('/aulas-agendadas', aulasAgendadasRouter(controllers.aac));

  return router;
}
