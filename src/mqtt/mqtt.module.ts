import { Module } from '@nestjs/common';
import { MqttService } from './service/mqtt.service';
import { MqttController } from './controller/mqtt.controller';

@Module({
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
