import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateAddressDto {
  @IsString()
  cep!: string;
}

export class CreatePatientDto {
  @IsString()
  nome!: string;

  @IsNumber()
  idade!: number;

  @Type(() => Date)
  @IsDate()
  dataNascimento!: Date;

  @Type(() => CreateAddressDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @IsArray()
  enderecos!: CreateAddressDto[];
}
