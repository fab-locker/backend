import {Test, TestingModule} from '@nestjs/testing';
import {MqttController} from './mqtt.controller';
import {MqttService} from '../service/mqtt.service';

describe('MqttController', () => {
    let mqttService: MqttService;
    let mqttController: MqttController;

    const mockMqttService = {
        publishMessage: jest.fn(),
    }

    beforeEach(async () => {
        const mqttModule: TestingModule = await Test.createTestingModule({
            controllers: [MqttController],
            providers: [
                {
                    provide: MqttService,
                    useValue: mockMqttService,
                },
            ],
        }).compile();

        mqttService = mqttModule.get<MqttService>(MqttService);
        mqttController = mqttModule.get<MqttController>(MqttController);
    });


    it('should be defined', () => {
        expect(mqttController).toBeDefined();
    });

    describe('publishMessage', () => {
        it('should publish a message', async () => {
            const message = 'Open';

            mockMqttService.publishMessage = jest.fn().mockResolvedValueOnce(message);

            const result = mqttController.openLocker();
            expect(mqttService.publishMessage).toHaveBeenCalled();
            expect(result).toEqual(`Message 'Open' published via MQTT on topic locker/open`);
        })
    })
});
