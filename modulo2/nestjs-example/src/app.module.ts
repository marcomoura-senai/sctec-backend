import { Module } from '@nestjs/common';
import { InstrutorModule } from './instrutor/instrutor.module';
import { AlunoModule } from './aluno/aluno.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './@common/filters/http-exception.filter';
import { BadRequestExceptionFilter } from './@common/filters/bad-request-exception.filter';

@Module({
  imports: [InstrutorModule, AlunoModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
  ],
})
export class AppModule {}
