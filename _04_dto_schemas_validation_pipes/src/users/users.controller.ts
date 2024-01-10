import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAllUsers(@Query('role') role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    return this.userService.findAllUsers(role);
  }

  @Get(':userId')
  findUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findUser(userId);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':userId')
  patchUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    this.userService.patchUser(userId, updateUserDto);
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
