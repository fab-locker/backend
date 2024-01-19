import {Test, TestingModule} from '@nestjs/testing';
import {MqttController} from "./mqtt.controller";
import {MqttService} from "../service/mqtt.service";

describe('MqttController', () => {
    let mqttController: MqttController;

    beforeEach(async () => {
        const mqttModule: TestingModule = await Test.createTestingModule({
            controllers: [MqttController],
            providers: [MqttService],
        }).compile();

        mqttController = mqttModule.get<MqttController>(MqttController);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(mqttController).toBeDefined()
        });
    });
});
