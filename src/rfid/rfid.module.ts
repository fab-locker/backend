import { Module } from '@nestjs/common';
import { sendRfidAuth } from './rfid.controller';
import { MqttService } from 'src/mqtt/service/mqtt.service';
import mqtt from 'mqtt/*';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  controllers: [sendRfidAuth],
    imports: [MqttModule]

})
export class RfidtModule {}
