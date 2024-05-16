import { Controller, Sse, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, from, interval, map } from 'rxjs';
import { Public } from 'src/auth/decorators/public.decorator';
import { MqttService } from 'src/mqtt/service/mqtt.service';

export interface MessageEvent {
  isAuthorized: boolean
}

@ApiTags('Rfid Authentification')
@Controller()
export class sendRfidAuth {
  constructor(private readonly mqttService: MqttService){}

  @Public()
  @Get('isAuthorized')
  @Sse()
  sendEvent(): Observable<MessageEvent> {
    return this.mqttService.getRfidScanObservable().pipe(map((isAuthorized: boolean)=>({isAuthorized})))
  }
}
