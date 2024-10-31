import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from './../database/database.module';
// import { MyLoggerModule } from 'src/my-logger/my-logger.module';

@Module({
  imports: [DatabaseModule /* MyLoggerModule */], // Importing modules to use its exported services
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
