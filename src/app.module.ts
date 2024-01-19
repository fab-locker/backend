import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LockersModule} from './lockers/lockers.module';
import {MqttController} from "./mqtt/controller/mqtt.controller";
import {MqttModule} from "./mqtt/mqtt.module";
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        MqttModule,
        LockersModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT as unknown as number,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
    controllers: [AppController, MqttController],
    providers: [AppService],
})
export class AppModule {
}
