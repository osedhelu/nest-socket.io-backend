import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly refector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.refector.get('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    console.log('TCL: UserRoleGuard -> constructor -> user', user);
    for (const items of roles) {
      switch (items) {
        case 'admin':
          return true;
        case 'super-user':
          return true;
        default:
          throw new ForbiddenException('');
      }
    }
    if (user.is_superuser) {
      throw new ForbiddenException('');
    }
    if (true) throw new BadRequestException('TCL: UserRoleGuard -> ');
    return true;
  }
}
