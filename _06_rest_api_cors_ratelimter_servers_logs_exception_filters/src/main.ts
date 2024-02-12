import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['error', 'warn', 'fatal', 'debug'],
    // logger: console,
    // bufferLogs: true, //<-- for custom logger, because outside of any module
    // ^--- To apply MyLoggerModule globally
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors({});
  app.setGlobalPrefix('api/v1/', {});
  // app.useLogger(app.get(MyLoggerService)); // <--- To apply MyLoggerModule globally

  await app.listen(3000, () =>
    console.log('Server is listening on http://localhost:3000/api/v1 '),
  );
}
bootstrap();
