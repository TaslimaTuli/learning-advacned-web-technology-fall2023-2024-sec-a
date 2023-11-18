import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Request,
  Get,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { SignInDto } from '../users/dto/sign-in.dto';
import { Public } from '../type/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from './auth.guard';
import { Cookie } from 'express-session';
import { RoleDto } from 'src/users/dto/role.dto';
import { Roles } from 'src/type/roles.decorator';
import { Role } from 'src/type/role.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  //@Public()
  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() UserDto: UserDto) {
    return this.usersService.create(UserDto);
  }

  //@Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('create-staff')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles('admin')
  //@Roles(Role.admin)
  async creaeteStaff(@Body() roleDto: RoleDto) {
    return this.usersService.createByAdmin(roleDto);
  }

  //logout
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Session() session: any) {
    //session.username = null;

    session.destroy();
    return { msg: 'You have logged out successfully!!' };
  }
}
