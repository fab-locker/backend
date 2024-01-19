// mqtt.controller.ts
import {Controller, Get} from '@nestjs/common';
import {MqttService} from '../service/mqtt.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('MQTT')
@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) {
    }

    @Get('open')
    openLocker(): string {
        this.mqttService.publishMessage('locker/open', 'Open');
        return `Message 'Open' published via MQTT on topic locker/open`;
    }
}
