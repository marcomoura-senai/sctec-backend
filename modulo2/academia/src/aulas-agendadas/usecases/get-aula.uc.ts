import { AulaAgendada } from '../aula-agendada.entity';
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository';

export class GetAulaUC {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async execute(id: number): Promise<AulaAgendada | null> {
    return this.repository.findById(id);
  }
}
