import { IsNumber } from 'class-validator';

export class AssignRoleDto {
  @IsNumber()
  instrutorId!: number;

  @IsNumber()
  roleId!: number;
}
