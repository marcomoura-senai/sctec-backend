import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends HttpExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    if (process.env.NODE_ENV === 'development') {
      return super.catch(exception, host);
    }

    return super.catch(new InternalServerErrorException(), host);
  }
}
