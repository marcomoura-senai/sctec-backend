import { Injectable, NotFoundException } from '@nestjs/common';
import { InstrutorRepository } from './instrutor.repository';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';

@Injectable()
export class InstrutorService {
  constructor(private readonly instrutorRepository: InstrutorRepository) {}

  async create(instrutor: CreateInstrutorDto) {
    return this.instrutorRepository.create(instrutor);
  }

  async get(id: number) {
    const instrutor = await this.instrutorRepository.get(id);
    if (!instrutor) {
      throw new NotFoundException(`Instrutor ${id} not found`);
    }

    return instrutor;
  }
}
