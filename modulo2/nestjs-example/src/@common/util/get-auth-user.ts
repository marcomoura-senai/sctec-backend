import type { Request } from 'express';
import { AuthUserDto } from '../dto/auth-user.dto';

export function getAuthUser(req: Request) {
  return req['user'] as AuthUserDto;
}
