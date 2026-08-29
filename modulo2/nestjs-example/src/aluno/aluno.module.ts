import { Module } from '@nestjs/common';
import { AlunoService, TYPEORM_ALUNO_REPOSITORY } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { AppDataSource } from '../@common/database/typeorm/typeorm';
import { Aluno } from '../@common/entities/aluno.entity';
import { JwtModule } from '../auth/jwt.module';

@Module({
  imports: [JwtModule],
  controllers: [AlunoController],
  providers: [
    AlunoService,
    {
      provide: TYPEORM_ALUNO_REPOSITORY,
      useFactory() {
        return AppDataSource.getRepository(Aluno);
      },
    },
  ],
})
export class AlunoModule {}
