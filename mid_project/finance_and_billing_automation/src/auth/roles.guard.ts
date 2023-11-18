import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { promises } from 'dns';
import { Role } from 'src/type/role.enum';
import { ROLES_KEY } from 'src/type/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { use } from 'passport';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (!requiredRoles) {
    //   return true;
    // }
    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const req = context.switchToHttp().getRequest();
    //console.log('check');

    if (req?.user) {
      const { username } = req.user;
      const user = await this.userService.findByUsername(username);
      //console.log('check');
      console.log(user);
      return roles.includes(user.role);
    }

    //console.log(ROLES_KEY, roles);
    // return false; //if false => all forbidden
  }
}
