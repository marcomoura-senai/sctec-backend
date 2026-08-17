import { Request, Response } from 'express';

import { CriarAulaDto } from './dtos/criar-aula.dto';
import { CriarAulaUC } from './usecases/criar-aula.uc';
import { GetAulaUC } from './usecases/get-aula.uc';
import { ListarAulasUC } from './usecases/listar-aulas.uc';
import { parseToInstance } from '../@common/platform/utils/validator.utils';

export class AulaAgendadaController {
  constructor(
    private readonly criarAulaUC: CriarAulaUC,
    private readonly listarAulasUC: ListarAulasUC,
    private readonly getAulaUC: GetAulaUC,
  ) {}

  async list(req: Request, res: Response) {
    const aulasAgendadas = await this.listarAulasUC.execute();
    res.status(200).json(aulasAgendadas);
  }

  async create(req: Request, res: Response) {
    const aulaAgendada = await parseToInstance(req.body, CriarAulaDto);

    const result = await this.criarAulaUC.execute(aulaAgendada);

    res.status(201).json(result);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'Invalid ID' });
      return;
    }

    const aulaAgendada = await this.getAulaUC.execute(id);

    if (!aulaAgendada) {
      res.status(404).json({ message: 'Aula não encontrada' });
      return;
    }
    res.json(aulaAgendada);
  }

  update(req: Request, res: Response) {
    res.status(204).send();
  }

  delete(req: Request, res: Response) {
    res.status(204).send();
  }
}
