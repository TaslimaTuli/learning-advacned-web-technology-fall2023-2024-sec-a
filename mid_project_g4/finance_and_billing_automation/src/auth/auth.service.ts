import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from '../users/dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful!!!',
      User: user.username,
      access_token: accessToken,
    };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    // console.log('hello');
    if (user && (await bcrypt.compare(password, user.password))) {
      //console.log(user.name);
      return user;
    }

    return null;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
