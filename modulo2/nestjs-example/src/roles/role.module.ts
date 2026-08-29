import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService, TYPEORM_ROLE_REPOSITORY } from './role.service';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { Role } from './roles.entity';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: TYPEORM_ROLE_REPOSITORY,
      useFactory() {
        return AppDataSource.getRepository(Role);
      },
    },
  ],
})
export class RoleModule {}
