import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MqttModule } from './mqtt.module';
import { MqttController } from '../controllers/mqtt.controller';

@Module({
  imports: [MqttModule],
  controllers: [AppController, MqttController],
  providers: [AppService],
})
export class AppModule {}
