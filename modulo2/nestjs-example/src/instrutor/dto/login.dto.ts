import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  registro!: string;
  @IsString()
  senha!: string;
}
