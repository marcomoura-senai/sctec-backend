import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../../auth/jwt.service';
import { Request } from 'express';
import { AuthUserDto } from '../dto/auth-user.dto';

declare module 'express' {
  export interface Request {
    user: AuthUserDto;
  }
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractToken(context: ExecutionContext) {
    const expressReq = context.switchToHttp().getRequest<Request>();

    if (!expressReq.headers.authorization) {
      throw new UnauthorizedException('No token provided');
    }

    const [bearerString, token] = expressReq.headers.authorization.split(' ');

    if (bearerString !== 'Bearer') {
      throw new UnauthorizedException('Invalid token provided');
    }

    return token;
  }

  private setPayload(context: ExecutionContext, payload: AuthUserDto) {
    context.switchToHttp().getRequest<Request>()['user'] = payload;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const payload = this.jwtService.verify(this.extractToken(context));
    if (payload.iss !== 'sctec') {
      // TODO: colocar issuer na variável de ambiente
      throw new UnauthorizedException('Invalid token provided');
    }
    this.setPayload(context, payload);
    return true;
  }
}
