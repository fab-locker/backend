// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Console } from 'console';
import mqtt, { IClientOptions } from 'mqtt';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;
  private receivedMessage: string;


  constructor(    
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    ) {
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
      this.client.subscribe('box_pickup/rfid');
    });

    this.client.on('error', (error) => {
      console.log(error);
    });

    this.client.on('message', async (topic, message) => {
      try{
        const mess = message.toString();
        
        console.log(mess)
      const existingUserRfid = await this.usersRepository.findOne({where:[{rfid: mess}]})
      if(existingUserRfid){
        console.log('user found')
        console.log('la carte appartient à : ' + existingUserRfid.mail)
      }else{
        console.log('user not found')
      }
      console.log('Received message:', topic, " : ", mess);
      this.receivedMessage = mess;
    } catch (error){
      console.error('Error while fetching user:', error);
    }
    });
     
  }

  async openDoor(id: number){
    this.turnOnOrOffLight(id, true)
    const topic = `box_pickup/casier${id}/open`
    this.publishMessage(topic, "1")
  }

  async testLockerDoor(id : number){
    const topic = `box_pickup/casier${id}/test_door`
    this.publishMessage(topic ,  "1")
    this.client.on('message', (receivedTopic: string, message) =>{
    console.log("received topic " + receivedTopic)
    console.log("topic " + topic)
      // if (receivedTopic === topic) {
      //   console.log(message.toString());
      //   console.log("tototototo");
      // }
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
