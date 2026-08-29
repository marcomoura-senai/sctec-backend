import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Repository } from 'typeorm';
import { Aluno, UPDATE_RESULT_FIELDS } from '../@common/entities/aluno.entity';
import { SearchAlunoDto } from './dto/search-aluno.dto';

export const TYPEORM_ALUNO_REPOSITORY = 'TYPEORM_ALUNO_REPOSITORY' as const;
@Injectable()
export class AlunoService {
  constructor(
    @Inject(TYPEORM_ALUNO_REPOSITORY)
    private readonly alunoRepository: Repository<Aluno>,
  ) {}

  create(createAlunoDto: CreateAlunoDto & { createdByInstrutorId: number }) {
    const alunoEntity = this.alunoRepository.create(createAlunoDto);
    return this.alunoRepository.save(alunoEntity);
  }

  find(searchAlunoDto: SearchAlunoDto) {
    const queryBuilder = this.alunoRepository.createQueryBuilder('aluno');

    if (searchAlunoDto.nome) {
      queryBuilder.andWhere('aluno.nome LIKE :nome', {
        nome: `%${searchAlunoDto.nome}%`,
      });
    }

    if (searchAlunoDto.plano) {
      queryBuilder.andWhere('aluno.plano LIKE :plano', {
        plano: `%${searchAlunoDto.plano}%`,
      });
    }

    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.alunoRepository.findOneBy({ id });
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    const alunoEntity = await this.alunoRepository.findOneBy({ id });

    if (!alunoEntity) {
      throw new NotFoundException(`Aluno ${id} not found`);
    }

    this.alunoRepository.merge(alunoEntity, updateAlunoDto);

    return this.alunoRepository.save(alunoEntity);
  }

  async remove(id: number) {
    const result = await this.alunoRepository.softDelete({ id });
    if (result.affected ?? 0 < 1) {
      throw new NotFoundException(`Aluno ${id} not found`);
    }
  }
}
