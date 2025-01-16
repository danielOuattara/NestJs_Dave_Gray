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
    return 'all interns';
  }

  @Get(':userId')
  findOneUser(@Param('userId') userId: string) {
    return { userId };
  }

  @Post()
  createUser(@Body() user: object) {
    return user;
  }

  @Patch(':userId')
  patchOneUser(@Param('userId') userId: string, @Body() userPatch: object) {
    return { userId, ...userPatch };
  }

  @Put(':userId')
  updateOneUser(@Param('userId') userId: string, @Body() userPatch: object) {
    return { userId, ...userPatch };
  }

  @Delete(':userId')
  deleteOneUser(@Param('userId') userId: string) {
    return { userId, message: 'User deleted' };
  }
}
