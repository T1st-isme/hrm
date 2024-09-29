import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User:', user);

    if (!user) {
      return false;
    }

    const employeeRoles = await this.prisma.employeeRole.findMany({
      where: { employeeId: user.id },
      include: { role: true },
    });

    console.log('Employee Roles:', employeeRoles);

    const userRoles = employeeRoles.map(er => er.role.name);

    console.log('Required Roles:', requiredRoles);
    console.log('User Roles:', userRoles);

    return requiredRoles.some(role => userRoles.includes(role));
  }
}
