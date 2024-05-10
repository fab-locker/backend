import { Module } from '@nestjs/common';
import { MqttService } from './service/mqtt.service';
import { MqttController } from './controller/mqtt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
