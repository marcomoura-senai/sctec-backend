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

  getPasswordByRegistro(
    registro: string,
  ): Promise<(Instrutor & { senha: string }) | null> {
    return this.repository.findOne({
      select: {
        senha: true,
        especialidade: true,
        nome: true,
        registro: true,
        id: true,
      },
      where: {
        registro,
      },
    });
  }

  get(id: number): Promise<Instrutor | null> {
    return this.repository.findOneBy({ id });
  }

  async create(instrutor: CreateInstrutorDto): Promise<Instrutor> {
    const instrutorEntity = this.repository.create(instrutor);
    const savedInstrutor = await this.repository.save(instrutorEntity);

    savedInstrutor.senha = '';
    return savedInstrutor;
  }
}
