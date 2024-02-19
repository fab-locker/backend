// mqtt.controller.ts
import { Controller } from '@nestjs/common';
import { MqttService } from '../service/mqtt.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MQTT')
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {
  }

  receiveMessage(): string {
    return this.mqttService.getReceivedMessage();
  }

  publishMessage(topic: string, message: string) {
    return this.mqttService.publishMessage(topic, message);
  }
}
