import { AulaAgendada, AulaAgendadaWrite } from '../aula-agendada.entity';

export interface AulaAgendadaRepository {
  create(aulaAgendada: AulaAgendadaWrite): Promise<AulaAgendada>;
  listAll(): Promise<AulaAgendada[]>;
  findById(id: number): Promise<AulaAgendada | null>;
  update(id: number, aulaAgendada: AulaAgendadaWrite): Promise<void>;
  softDelete(id: number): Promise<void>;
}
