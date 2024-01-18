import {Test, TestingModule} from '@nestjs/testing';
import {MqttController} from './mqtt.controller';
import {MqttService} from '../service/mqtt.service';

// Créez une classe mock pour le service
class MqttServiceMock {
    publishMessage(topic: string, message: string): void {
        // Logique de mock, ne fait rien dans cet exemple
    }
}

describe('MqttController', () => {
    let controller: MqttController;
    let mqttService: MqttService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MqttController],
            providers: [
                {
                    provide: MqttService,
                    useClass: MqttServiceMock, // Utilisez la classe mock pour le service
                },
            ],
        }).compile();

        controller = module.get<MqttController>(MqttController);
        mqttService = module.get<MqttService>(MqttService);
    });

    describe('openLocker', () => {
        it('should publish a message via MQTT', () => {
            const publishSpy = jest.spyOn(mqttService, 'publishMessage');

            const result = controller.openLocker();

            expect(publishSpy).toHaveBeenCalledWith('locker/open', 'Open');
            expect(result).toEqual(`Message 'Open' published via MQTT on topic locker/open`);
        });
    });
});
