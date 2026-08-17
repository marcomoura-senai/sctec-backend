import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CriarAulaDto {
  @Type(() => Date)
  @IsDate()
  dataHora!: Date;

  @IsString()
  duracao!: string;

  @IsNumber()
  instrutorId!: number;

  @IsNumber()
  alunoId!: number;
}
