import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InstrutorService } from './instrutor.service';

@Controller('instrutores/login')
export class InstrutorLoginController {
  constructor(private readonly instrutorService: InstrutorService) {}

  @Post()
  login(@Body() createInstrutorDto: LoginDto) {
    return this.instrutorService.login(createInstrutorDto);
  }
}
