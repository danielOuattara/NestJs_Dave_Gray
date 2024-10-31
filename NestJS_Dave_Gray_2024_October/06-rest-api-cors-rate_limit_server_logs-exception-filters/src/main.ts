import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception-filter';
// import { MyLoggerService } from './my-logger/my-logger.service';

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
  app.setGlobalPrefix('api/v1', {});
  // app.useLogger(app.get(MyLoggerService)); // <--- To apply MyLoggerModule globally

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/api/v1`);
  });
}
bootstrap();
