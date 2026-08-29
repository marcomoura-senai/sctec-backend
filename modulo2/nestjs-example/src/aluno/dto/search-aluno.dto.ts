import { IsOptional, IsString } from 'class-validator';

export class SearchAlunoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  plano?: string;
}
