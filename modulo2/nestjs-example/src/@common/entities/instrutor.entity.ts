import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/roles.entity';

@Entity()
export class Instrutor {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id!: number;

  @Column('varchar', { length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, select: false })
  senha!: string;

  @Column('varchar', { length: 255 })
  especialidade!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  registro!: string;

  @ManyToMany(() => Role, (role) => role.instrutores)
  roles!: Role[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
