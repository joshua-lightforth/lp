import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    try {
        // Create HTTP application
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );
        // get env
        const configService = app.get(ConfigService);

        // Create Kafka microservice
        app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: [configService.get('kafka.url')],
                },
                consumer: {
                    groupId: configService.get('kafka.group_id'),
                },
            },
        });

        // Start Kafka microservice
        await app.startAllMicroservices();
        logger.log('Kafka microservice is running');

        // Start HTTP application
        const port = configService.get<number>('PORT') || 9000;
        await app.listen(port);
        logger.log(`🚀Authentication Service is running on: http://localhost:${port}`);
    } catch (error) {
        logger.error('Error during application bootstrap', error.stack);
    }
}
bootstrap();
