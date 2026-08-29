import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const UPDATE_RESULT_FIELDS: Array<keyof Aluno> = ['nome', 'plano'];

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id!: number;

  @Column('varchar', { length: 255 })
  nome!: string;

  @Column('varchar', { length: 255 })
  plano!: string;

  @Column('int')
  createdByInstrutorId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
