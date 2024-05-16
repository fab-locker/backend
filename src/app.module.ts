import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LockersModule} from './lockers/lockers.module';
import {ConfigModule} from '@nestjs/config';
import {UsersModule} from "./users/users.module";
import { ItemsModule } from './items/items.module';
import { HistoricModule } from './historic/historic.module';
import { MqttModule } from './mqtt/mqtt.module';
import { BorrowModule } from './borrow/borrow.module';
import { RfidtModule } from './rfid/rfid.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MqttModule,
    HistoricModule,
    ItemsModule,
    BorrowModule,
    LockersModule,
    RfidtModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {
}
