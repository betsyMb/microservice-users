// Nest
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

// Module
import { AppModule } from './app.module';

// Constants
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQ.UserQueue,
    },
  });

  await app.listen();

  console.log('Microservice Users is Listening');
}
bootstrap();
