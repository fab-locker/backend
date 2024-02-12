import { Test, TestingModule } from '@nestjs/testing';
import { MqttService } from './mqtt.service';

describe('MqttService', () => {
  let mqttService: MqttService;

  beforeEach(async () => {
    const mqttModule: TestingModule = await Test.createTestingModule({
      providers: [MqttService],
    }).compile();

    mqttService = mqttModule.get<MqttService>(MqttService);
  });

  it('should be defined', () => {
    expect(mqttService).toBeDefined();
  });
});
