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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  //@Public()
  @Post('signup')
  @ApiCreatedResponse({
    description: 'User is created :)',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Try Again :( ' })
  @UsePipes(ValidationPipe)
  async signUp(@Body() UserDto: UserDto) {
    return this.usersService.create(UserDto);
  }

  //@Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiCreatedResponse({
    description: 'Login Successful :)',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Login Unsuccessful. Try Again :( ' })
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  ///other roles like staffs and manager's account are created by admin.
  //these can not be created by normal signup
  @Post('admin/create-staffs')
  @ApiCreatedResponse({
    description: 'Staff Created Successfully :)',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Try Again :( ' })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles('admin')
  async creaeteStaff(@Body() roleDto: RoleDto) {
    return this.usersService.createByAdmin(roleDto);
  }

  //logout
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  @ApiOkResponse({
    description: 'You have logged out successfully',
  })
  @ApiBadRequestResponse({
    description: 'Try Again :( ',
  })
  logout(@Session() session: any) {
    //session.username = null;

    session.destroy();
    return { msg: 'You have logged out successfully!!' };
  }
}
