import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthModule {
}
