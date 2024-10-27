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

/* 
GET /users  // done !
GET /users?role=value&country=china  // 
GET /users/:id  // done !
POST /users  // done !
PATCH /users/:id  // done !
PUT /users/:id  // done !
DELETE /users/:id  // done !

*/

@Controller('users')
export class UsersController {
  @Get()
  findAllUsers(@Query('role') role?: 'admin' | 'moderator' | 'owner') {
    if (role) {
      return role;
    } else {
      return [];
    }
  }

  @Get('interns')
  findAllInterns() {
    return 'Interns list';
  }

  @Get(':userId')
  findOneUser(@Param('userId') userId: string) {
    return { userId };
  }

  @Post()
  create(@Body() user: object) {
    return user;
  }

  @Patch(':userId')
  patchOneUser(@Param('userId') userId: string, @Body() user: object) {
    return { userId, user };
  }

  @Put(':userId')
  updateOneUser(@Param('userId') userId: string, @Body() user: object) {
    return { userId, user };
  }

  @Delete(':userId')
  deleteOneUser(@Param('userId') userId: string) {
    return { userId };
  }
}
