import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { InstrutorService } from './instrutor.service';
import { JwtGuard } from '../@common/guards/jwt.guard';
import type { Request } from 'express';
import { getAuthUser } from '../@common/util/get-auth-user';

@UseGuards(JwtGuard)
@Controller('instrutores')
export class InstrutorController {
  constructor(private readonly instrutorService: InstrutorService) {}

  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number, @Req() req: Request) {
    const authUser = getAuthUser(req);
    console.log('Usuario logado: ', authUser);
    return this.instrutorService.get(id);
  }

  @Post()
  create(@Body() createInstrutorDto: CreateInstrutorDto) {
    return this.instrutorService.create(createInstrutorDto);
  }
}
