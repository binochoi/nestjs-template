import { Role } from '@global/enums/UserRole';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { ROLES_KEY as USER_KEY } from 'src/decorators/Roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { /** */ }

  canActivate(context: ExecutionContext): boolean {
    return this.canUserActivate(context);
  }

  private canUserActivate(context: ExecutionContext) {
    const role = this.reflector.getAllAndOverride<Role[]>(USER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) || [];
    if (role === undefined) {
      return true;
    }
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const { user } = (req.raw as any);
    if (!user) {
      return false;
    }
    return user.role >= role;
  }
}
