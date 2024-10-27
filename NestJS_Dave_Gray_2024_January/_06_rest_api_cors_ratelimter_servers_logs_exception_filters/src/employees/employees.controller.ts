import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// @SkipThrottle() //<-- apply SkipThrottle to all "employees controllers"
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly myLogger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // <-- reject SkipThrottle in this route
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.myLogger.log(
      `Request for ALL employees\t${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 200, limit: 1 } }) // <-- 'short' rate limiter overwrite the one in from app.ts
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Throttle({ long: { ttl: 1000, limit: 2 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
