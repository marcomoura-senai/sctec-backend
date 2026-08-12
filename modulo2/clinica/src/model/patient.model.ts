import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Endereco } from './endereco.model';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column('integer')
  idade!: number;

  @Column('date')
  dataNascimento!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Endereco, (endereco) => endereco.patient, {
    cascade: ['insert', 'update'],
  })
  enderecos!: Endereco[];
}
