// mqtt.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MqttService } from '../service/mqtt.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MQTT')
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('rfid')
  rfid(): string {
    return this.mqttService.getReceivedMessage();
  }
}
