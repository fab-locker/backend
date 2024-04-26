import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  };

  roleHierarchy = [Role.User, Role.Admin];

  matchRoles(authorizedRole: Role, userRole: Role): boolean {
    const userRoleIndex = this.roleHierarchy.indexOf(userRole);
    const authorizedRoleIndex = this.roleHierarchy.indexOf(authorizedRole);
    return authorizedRoleIndex <= userRoleIndex;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<Role>('role', context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(role, user.role);
  }
}
