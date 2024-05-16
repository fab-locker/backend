import { Controller, Sse, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, from, interval, map } from 'rxjs';
import { MqttService } from 'src/mqtt/service/mqtt.service';

export interface MessageEvent {
  isAuthorized: boolean
}

@ApiTags('Rfid Authentification')
@Controller()
export class sendRfidAuth {
  constructor(private readonly mqttService: MqttService){}

  @Get('isAuthorized')
  @Sse()
  sendEvent(): Observable<MessageEvent> {
      console.log(this.mqttService.getRfidScanObservable().pipe(map((isAuthorized: boolean)=>({isAuthorized}))))
    return this.mqttService.getRfidScanObservable().pipe(map((isAuthorized: boolean)=>({isAuthorized})))
  }
}
