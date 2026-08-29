import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Instrutor } from '../@common/entities/instrutor.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id!: number;

  @Column('varchar', { length: 255 })
  role!: string;

  @ManyToMany(() => Instrutor, (instrutor) => instrutor.roles)
  @JoinTable()
  instrutores!: Instrutor[];
}
