import { Repository } from 'typeorm';

import { AulaAgendada } from '../aula-agendada.entity';
import { AulaAgendadaRepository } from './aula-agendada.repository';

export class AulaAgendadaTypeOrmRepository implements AulaAgendadaRepository {
  constructor(private readonly repository: Repository<AulaAgendada>) {}

  create(aulaAgendada: Omit<AulaAgendada, 'id'>): Promise<AulaAgendada> {
    const entity = this.repository.create(aulaAgendada);

    return this.repository.save(entity);
  }

  listAll(): Promise<AulaAgendada[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<AulaAgendada | null> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    aulaAgendada: Omit<AulaAgendada, 'id'>,
  ): Promise<void> {
    await this.repository.update(id, aulaAgendada);
  }

  async softDelete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}
