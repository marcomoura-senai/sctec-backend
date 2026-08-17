import { AulaAgendada } from '../aula-agendada.entity';
import { CriarAulaDto } from '../dtos/criar-aula.dto';
import { AulaAgendadaRepository } from '../repositories/aula-agendada.repository';

export class CriarAulaUC {
  constructor(private readonly repository: AulaAgendadaRepository) {}

  async execute(dto: CriarAulaDto): Promise<AulaAgendada> {
    // TODO: Check conflicting schedules for the same instructor and student

    return this.repository.create(dto);
  }
}
