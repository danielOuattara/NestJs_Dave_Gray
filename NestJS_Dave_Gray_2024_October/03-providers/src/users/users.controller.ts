import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

/* 
GET /users  
GET /users?role=value&country=china  
GET /users/:id  
POST /users  
PATCH /users/:id  
PUT /users/:id  
DELETE /users/:id  
*/

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAllUsers(@Query('role') role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    return this.userService.findAllUsers(role);
  }

  @Get('intern')
  findAllInterns() {
    return 'all interns';
  }

  @Get(':userId')
  findOneUser(@Param('userId') userId: string) {
    return this.userService.findOneUser(userId);
  }

  @Post()
  createUser(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    return this.userService.createUser(user);
  }

  @Patch(':userId')
  patchOneUser(
    @Param('userId') userId: string,
    @Body()
    userData: Partial<{
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    }>,
  ) {
    return this.userService.patchOneUser(userId, userData);
  }

  @Put(':userId')
  updateOneUser(
    @Param('userId') userId: string,
    @Body()
    userData: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    return this.userService.updateOneUser(userId, userData);
  }

  @Delete(':userId')
  deleteOneUser(@Param('userId') userId: string) {
    return this.userService.deleteOneUser(userId);
  }
}
