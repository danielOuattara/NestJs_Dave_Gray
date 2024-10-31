import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// apply SkipThrottle to all "employees controllers"
// SkipThrottle();
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    // private readonly myLoggerService: MyLoggerService,
  ) {}
  private readonly myLoggerService = new MyLoggerService(
    EmployeesController.name,
  );

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  // reject SkipThrottle in this route
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: string) {
    this.myLoggerService.log(
      `Request for ALL employees\t${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  // 'short' rate limiter overwrite the one in from app.module.ts
  @Throttle({ short: { ttl: 1000, limit: 3 } })
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
