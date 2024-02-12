// mqtt.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MqttController } from './mqtt.controller';
import { MqttService } from '../service/mqtt.service';
import { MqttServiceMock } from '../../mocks/mqtt.service.mock';

describe('MqttController', () => {
  let mqttController: MqttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttController],
      providers: [{ provide: MqttService, useClass: MqttServiceMock }],
    }).compile();

    mqttController = module.get<MqttController>(MqttController);
  });

  describe('receiveMessage', () => {
    it('should receive a message', () => {
      expect(mqttController.receiveMessage()).resolves.toEqual('Message received');
    });
  });

  describe('publishMessage', () => {
    it('should publish a message', () => {
      expect(mqttController.publishMessage('topic', 'message')).resolves.toEqual('Message published');
    });
  });
});
