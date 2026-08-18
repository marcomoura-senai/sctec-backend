import { Injectable } from '@nestjs/common';
import { Instrutor } from '../@common/entities/instrutor.entity';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';

@Injectable()
export abstract class InstrutorRepository {
  abstract create(instrutor: CreateInstrutorDto): Promise<Instrutor>;

  abstract get(id: number): Promise<Instrutor | null>;
}
