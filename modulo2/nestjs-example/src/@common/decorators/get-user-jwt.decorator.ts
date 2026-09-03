import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserDto } from '../dto/auth-user.dto';

export const GetUserJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getUserJwt(ctx);
  },
);

export function getUserJwt(ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request['user'] as AuthUserDto;
}
