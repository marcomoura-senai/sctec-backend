import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Paciente } from './patient.model';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ type: 'integer' })
  patientId!: number;

  @Column({ type: 'char', length: 8 })
  cep!: string;

  @JoinColumn({ name: 'patientId' })
  @ManyToOne(() => Paciente, (patient) => patient.enderecos)
  patient!: Paciente;
}
