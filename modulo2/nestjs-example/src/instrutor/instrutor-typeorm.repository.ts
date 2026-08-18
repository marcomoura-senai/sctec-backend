import { Repository } from 'typeorm';
import { Instrutor } from '../@common/entities/instrutor.entity';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { InstrutorRepository } from './instrutor.repository';
import { Inject, Injectable } from '@nestjs/common';

export const TYPEORM_INSTRUTOR_REPOSITORY =
  'TYPEORM_INSTRUTOR_REPOSITORY' as const;

@Injectable()
export class InstrutorTypeormRepository implements InstrutorRepository {
  constructor(
    @Inject(TYPEORM_INSTRUTOR_REPOSITORY)
    private readonly repository: Repository<Instrutor>,
  ) {}
  get(id: number): Promise<Instrutor | null> {
    return this.repository.findOneBy({ id });
  }
  create(instrutor: CreateInstrutorDto): Promise<Instrutor> {
    const instrutorEntity = this.repository.create(instrutor);
    return this.repository.save(instrutorEntity);
  }
}
