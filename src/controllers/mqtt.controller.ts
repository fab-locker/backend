// mqtt.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MqttService } from '../services/mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('publish')
  publishMessage(): string {
    this.mqttService.publishMessage('my/test/topic', 'Hello from Nest.js MQTT');
    return 'Message published via MQTT';
  }
}
