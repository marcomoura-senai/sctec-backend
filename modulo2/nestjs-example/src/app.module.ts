import { Module } from '@nestjs/common';
import { InstrutorModule } from './instrutor/instrutor.module';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [InstrutorModule, AlunoModule], // importa o que esse módulo precisa
})
export class AppModule {}
