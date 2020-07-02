import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authsMeta = this.reflector.get<string[]>(
      'auths',
      context.getHandler(),
    );
    // 不存在则允许
    if (!authsMeta) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const auths = user.auths || null;
    const hasRole = () =>
    auths && auths.some((auth: string) => authsMeta.includes(auth));
    return user && auths && hasRole();
  }
}
