import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [AuthController],
//   providers: [AuthService, UsersService],
//   exports: [UsersService],
// })
// export class AuthModule {}

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', // secret key used to sign and verify JWT tokens
      signOptions: { expiresIn: '1h' }, //1-hour expiration time of JWT
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    LocalStrategy,
    SessionSerializer,
  ],
  exports: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
