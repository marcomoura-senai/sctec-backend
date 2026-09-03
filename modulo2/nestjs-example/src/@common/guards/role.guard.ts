import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from '../entities/roles';
import { getUserJwt } from '../decorators/get-user-jwt.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      throw new Error(
        'Do not Use RoleGuard without Roles, use @Roles(). Adding the guard without the metadata is confusing and do not have an explicit behavior',
      );
    }
    const userJwt = getUserJwt(context);

    if (roles.includes(userJwt.role)) {
      return true;
    }

    return false;
  }
}
