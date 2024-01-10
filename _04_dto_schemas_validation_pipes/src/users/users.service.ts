import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersData } from './user-data';

@Injectable()
export class UsersService {
  private users = usersData;

  findAllUsers(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findUser(userId: number) {
    return this.users.find((user) => user.userId === userId);
  }

  createUser(createUserDto: CreateUserDto) {
    this.users = [
      ...this.users,
      { userId: new Date().getTime(), ...createUserDto },
    ];
    return this.users;
  }

  patchUser(userId: number, updateUserDto: UpdateUserDto) {
    const userIndexToPatch = this.users.findIndex(
      (user) => user.userId === userId,
    );

    this.users[userIndexToPatch] = {
      ...this.users[userIndexToPatch],
      ...updateUserDto,
    };
    return this.findUser(userId);
  }

  updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const userIndexToUpdate = this.users.findIndex(
      (user) => user.userId === userId,
    );

    this.users[userIndexToUpdate] = { userId, ...updateUserDto };
    return this.findUser(userId);
  }

  deleteUser(userId: number) {
    const userIndexToDelete = this.users.findIndex(
      (user) => user.userId === userId,
    );

    if (userIndexToDelete === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndexToDelete, 1);
    return this.users;
  }
}
