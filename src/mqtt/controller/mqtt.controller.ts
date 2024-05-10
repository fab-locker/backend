// mqtt.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MqttService } from '../service/mqtt.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LockerDto } from 'src/lockers/dto/locker.dto';

@ApiTags('MQTT')
@Controller('api/mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {
  }


  @ApiOperation({ summary: 'open the locker door' })
  @Get('openLocker/:id')
  openLocker(@Param('id') locker: number){
    this.mqttService.openDoor(locker)
  }

  @ApiOperation({ summary: 'test if the locker door is open or closed' })
  @Get('testLockerDoor/:id')
  testLockerDoor(@Param('id') locker: number){
    this.mqttService.testLockerDoor(locker)
  }

  @ApiOperation({ summary: 'turn on the light in the locker' })
  @Post('turnOnLight/:id/:turnOn')
  turnOnLight(@Param('id') locker: number, @Param('turnOn') turnOn: string){
      this.mqttService.turnOnOrOffLight(locker, turnOn)
    }


  @ApiOperation({ summary: 'get the weight of the object in the locker' })
  @Get('getWeight/:id')
  getWeight(@Param('id') locker: number): Promise<string>{
      return this.mqttService.getWeight(locker) 
  }

  @ApiOperation({ summary: 'tare the weight to reinit it' })
  @Post('tare/:id')
  async tare(@Param('id') locker: number): Promise<string>{
    return this.mqttService.tare(locker);
  }

  @Get('state')
  async receiveMessage(): Promise<string> {
    return this.mqttService.getReceivedMessage();
  }

  @Post('message')
  publishMessage(topic: string, message: string) {
    return this.mqttService.publishMessage(topic, message);
  }
}
