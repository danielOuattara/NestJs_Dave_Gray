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
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ROLE } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findAllUsers(@Query('role') role?: string) {
    return this.userService.findAllUsers(role);
  }

  @Get('intern')
  findAllInterns() {
    return 'all interns';
  }

  @Get(':userId')
  findOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOneUser(userId);
  }

  @Post()
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':userId')
  patchOneUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe)
    updateUserDto: PatchUserDto,
  ) {
    return this.userService.patchOneUser(userId, updateUserDto);
  }

  @Put(':userId')
  updateOneUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe)
    createUserDto: UpdateUserDto,
  ) {
    return this.userService.updateOneUser(userId, createUserDto);
  }

  @Delete(':userId')
  deleteOneUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteOneUser(userId);
  }
}
