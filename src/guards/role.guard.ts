import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/utils/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    const matched = this.matchRoles(roles, user?.role);

    if (matched) return true;

    throw new UnauthorizedException('User unauthorized.');
  }

  private matchRoles(roles: UserRole[], userRole: UserRole): boolean {
    const includes = roles.includes(userRole);
    return includes;
  }
}
