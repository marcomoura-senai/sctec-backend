import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Aluno } from './aluno.entity';
import { Instrutor } from './instrutor.entity';

export type AulaAgendadaWrite = Pick<
  AulaAgendada,
  'dataHora' | 'instrutorId' | 'alunoId' | 'duracao'
>;

@Entity()
export class AulaAgendada {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id!: number;

  @Column('timestamptz')
  dataHora!: Date;

  @Column('interval')
  duracao!: string;

  @Index()
  @Column('integer')
  instrutorId!: number;

  @Index()
  @Column('integer')
  alunoId!: number;

  @JoinColumn({ name: 'instrutor_id' })
  @ManyToOne(() => Instrutor, { nullable: false })
  instrutor!: Instrutor;

  @JoinColumn({ name: 'aluno_id' })
  @ManyToOne(() => Aluno, { nullable: false })
  aluno!: Aluno;
}
