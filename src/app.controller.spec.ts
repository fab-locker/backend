import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should be defined"', () => {
            expect(appController).toBeDefined();
        });

        it('should return the homepage HTML', () => {
            const mockHtml = 'Mocked HTML';
            jest.spyOn(appController, 'getHomePage').mockReturnValue(mockHtml);
            expect(appController.getHomePage()).toEqual(mockHtml);
        });
    });

});
