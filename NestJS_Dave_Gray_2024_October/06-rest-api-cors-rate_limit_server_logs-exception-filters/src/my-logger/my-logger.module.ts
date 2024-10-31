import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  providers: [MyLoggerService],
  // exports: [MyLoggerService], // This makes MyService available outside this module
})
export class MyLoggerModule {}
