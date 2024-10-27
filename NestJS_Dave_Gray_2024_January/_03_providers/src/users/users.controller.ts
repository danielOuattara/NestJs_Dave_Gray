import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

/* 
GET /users  // done !
GET /users?role=value&country=china  // done !
GET /users/:id  // done !
POST /users  // done !
PATCH /users/:id  // done !
PUT /users/:id  // done !
DELETE /users/:id  // done !

*/

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAllUsers(@Query('role') role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    return this.userService.findAllUsers(role);
  }

  @Get(':userId')
  findOneUser(@Param('userId') userId: string) {
    return this.userService.findOneUser(userId);
  }

  @Post()
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':userId')
  patchOneUser(
    @Param('userId') userId: string,
    @Body()
    user: Partial<{
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    }>,
  ) {
    return this.userService.patchOneUser(userId, user);
  }

  @Put(':userId')
  updateOneUser(
    @Param('userId') userId: string,
    @Body()
    user: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    return this.userService.updateOneUser(userId, user);
  }

  @Delete(':userId')
  deleteOneUser(@Param('userId') userId: string) {
    return this.userService.deleteOneUser(userId);
  }
}
