import { IsString } from 'class-validator';

export class CreateInstrutorDto {
  @IsString()
  nome!: string;
  @IsString()
  especialidade!: string;
  @IsString()
  registro!: string;
}
