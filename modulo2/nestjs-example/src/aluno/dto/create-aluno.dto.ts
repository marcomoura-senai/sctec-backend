import { IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsString()
  nome!: string;

  @IsString()
  plano!: string;
}
