import { Module } from '@nestjs/common';
import { InstrutorController } from './instrutor.controller';
import { InstrutorService } from './instrutor.service';
import {
  InstrutorTypeormRepository,
  TYPEORM_INSTRUTOR_REPOSITORY,
} from './instrutor-typeorm.repository';
import { InstrutorRepository } from './instrutor.repository';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { Instrutor } from '../@common/entities/instrutor.entity';

@Module({
  controllers: [InstrutorController],
  providers: [
    InstrutorService,
    {
      provide: InstrutorRepository, // Quando pedir a porta
      useClass: InstrutorTypeormRepository, // Usar a implementação
    },
    {
      provide: TYPEORM_INSTRUTOR_REPOSITORY,
      useFactory() {
        return AppDataSource.getRepository(Instrutor);
      },
    },
  ],
})
export class InstrutorModule {}
