import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { SearchAlunoDto } from './dto/search-aluno.dto';
import { JwtGuard } from '../@common/guards/jwt.guard';
import { GetUserJwt } from '../@common/decorators/get-user-jwt.decorator';
import type { AuthUserDto } from '../@common/dto/auth-user.dto';

@UseGuards(JwtGuard)
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  create(
    @Body() createAlunoDto: CreateAlunoDto,
    @GetUserJwt() user: AuthUserDto,
  ) {
    return this.alunoService.create({
      ...createAlunoDto,
      createdByInstrutorId: user.data.id,
    });
  }

  @Get()
  find(@Query() searchAlunoDto: SearchAlunoDto) {
    return this.alunoService.find(searchAlunoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}
