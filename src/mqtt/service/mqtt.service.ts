// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import mqtt, { IClientOptions } from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;
  private receivedMessage: string;


  constructor() {
    const options: IClientOptions = {
      host: '0bd8cb66f7bc4d168d6512d83832a462.s1.eu.hivemq.cloud',
      port: 8883,
      protocol: 'mqtts',
      username: 'PLSmqtt',
      password: 'PortableL3dSystem',
    };

    this.client = mqtt.connect(options);

    this.client.on('connect', () => {
      console.log('Connected');
      this.client.subscribe('box_pickup/rfid/connection');
    });

    this.client.on('error', (error) => {
      console.log(error);
    });

    this.client.on('message', (topic, message) => {
      console.log('Received message:', topic, message.toString());
      this.receivedMessage = message.toString();
    });

  }

  async testLockerDoor(id : number){
    const topic = `box_pickup/casier${id}/test_door`
    this.publishMessage(topic ,  "1")
    this.client.on('message', (receivedTopic: string, message) =>{
      if (receivedTopic === topic) {
        console.log(message.toString());
      }
    });
  }

  async turnOnOrOffLight(id: number, turnOn: boolean){
    console.log(turnOn)
    if(turnOn){
      console.log("toto")
    this.publishMessage(`box_pickup/casier${id}/light`,"1")
    }else{
      console.log("tata")
      this.publishMessage(`box_pickup/casier${id}/light`,"0")
    }
  }


  async getWeight(id: number): Promise<string | null>{
    let received_message: string;
    this.publishMessage(`box_pickup/casier${id}/weight`,"1")
    this.client.on('message', (topic: string, message) => {
      if(topic === `box_pickup/casier${id}/log_weight`){
        received_message = message.toString()
      }
    })
    return received_message;
  }


  async tare(id: number): Promise<string>{
    try{
    this.publishMessage(`box_pickup/casier${id}/tare`,"1")
    this.client.on('message', (topic: string, message) => {
      if(topic === `box_pickup/casier${id}/log_tare`){
      console.log(message)
      return message;
      }
    })
  }catch(error){
    return error
  }
  }

  publishMessage(topic: string, message: string): string {
    this.client.publish(topic, message);
    return `Message ${message} published on topic ${topic}`;
  }

  async getReceivedMessage(): Promise<string> {
    return this.receivedMessage;
  }

}
