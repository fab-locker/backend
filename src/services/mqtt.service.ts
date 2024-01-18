// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import mqtt, { IClientOptions } from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    const options: IClientOptions = {
      host: '9badbe94c25a4774be743345e8145009.s2.eu.hivemq.cloud',
      port: 8883,
      protocol: 'mqtts',
      username: 'admin',
      password: 'Adminjunia59',
    };

    this.client = mqtt.connect(options);

    this.client.on('connect', () => {
      console.log('Connected');
    });

    this.client.on('error', (error) => {
      console.log(error);
    });

    this.client.on('message', (topic, message) => {
      console.log('Received message:', topic, message.toString());
    });

    this.client.subscribe('my/test/topic');
  }

  publishMessage(topic: string, message: string): void {
    this.client.publish(topic, message);
  }
}
