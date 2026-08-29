import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AssignRoleDto } from './dto/assign-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body('role') role: string | null) {
    if (!role) {
      throw new BadRequestException('Role is required');
    }
    return this.roleService.create(role);
  }

  @Post(':id/assign-instrutor')
  assignToInstrutor(
    @Param('id') id: number,
    @Body() assignRoleDto: AssignRoleDto,
  ) {
    if (+id !== assignRoleDto.roleId) {
      throw new BadRequestException('Invalid role id');
    }
    return this.roleService.assignToInstrutor(assignRoleDto);
  }
}
