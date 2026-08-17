import { AulaAgendada } from '../aula-agendada.entity';
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository';

export class ListarAulasUC {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async execute(): Promise<AulaAgendada[]> {
    return this.repository.listAll();
  }
}
