import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  // private validateAndConvertRole(role?: string): Role | undefined {
  //   if (!role) return undefined;
  //   const uppercaseRole = role.toUpperCase() as Role;
  //   if (!Object.values(Role).includes(uppercaseRole)) {
  //     throw new BadRequestException(`Invalid role: ${role}`);
  //   }
  //   return uppercaseRole;
  // }

  private upperCaseQueryValue(role?: string): Role | undefined {
    if (!role) return undefined;
    return role.toUpperCase() as Role;
  }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.dataBaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: string) {
    const validatedRole = this.upperCaseQueryValue(role);
    // If role is valid, use it in the filter; otherwise, find all employees
    return this.dataBaseService.employee.findMany({
      where: validatedRole ? { role: validatedRole } : {},
    });
  }

  async findOne(id: number) {
    return this.dataBaseService.employee.findUnique({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.dataBaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.dataBaseService.employee.delete({ where: { id } });
  }
}
