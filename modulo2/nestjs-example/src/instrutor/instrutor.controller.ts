import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateInstrutorDto } from './dto/create-instrutor.dto';
import { InstrutorService } from './instrutor.service';

@Controller('instrutores')
export class InstrutorController {
  constructor(private readonly instrutorService: InstrutorService) {}

  @Get(':id')
  get(@Param('id', new ParseIntPipe()) id: number) {
    return this.instrutorService.get(id);
  }

  @Post()
  create(@Body() createInstrutorDto: CreateInstrutorDto) {
    return this.instrutorService.create(createInstrutorDto);
  }
}
