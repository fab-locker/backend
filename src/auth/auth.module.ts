import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-stragy';

@Module({
  providers: [AuthService, UsersService, JwtService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([UsersEntity]),
  ],
})
export class AuthModule {
}
