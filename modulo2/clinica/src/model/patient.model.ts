import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
