import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Instrutor } from '../@common/entities/instrutor.entity';

export const TYPEORM_ROLE_REPOSITORY = 'TYPEORM_ROLE_REPOSITORY' as const;

@Injectable()
export class RoleService {
  constructor(
    @Inject(TYPEORM_ROLE_REPOSITORY)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(role: string) {
    const roleEntity = this.roleRepository.create({ role: role });
    return this.roleRepository.save(roleEntity);
  }

  async assignToInstrutor(assignRoleDto: AssignRoleDto) {
    const role = await this.roleRepository.findOneByOrFail({
      id: assignRoleDto.roleId,
    });

    const instrutor = new Instrutor();
    instrutor.id = assignRoleDto.instrutorId;
    role.instrutores = [instrutor];

    return this.roleRepository.save(role);
  }
}
