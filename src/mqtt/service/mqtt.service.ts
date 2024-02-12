// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import mqtt, { IClientOptions } from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;
  private receivedMessage: string;

  constructor() {
    const options: IClientOptions = {
      host: '8f9d13c4539441108d6ce0803630c8aa.s2.eu.hivemq.cloud',
      port: 8883,
      protocol: 'mqtts',
      username: 'fablocker_AP4',
      password: 'Fablocker59000.',
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
      this.receivedMessage = message.toString();
    });

    this.client.subscribe('rfidTopic');
  }

  publishMessage(topic: string, message: string): string {
    this.client.publish(topic, message);
    return `Message ${message} published on topic ${topic}`;
  }

  getReceivedMessage(): string {
    return this.receivedMessage;
  }
}
