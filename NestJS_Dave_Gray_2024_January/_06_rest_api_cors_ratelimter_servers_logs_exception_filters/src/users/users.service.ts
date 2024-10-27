import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersData } from './user-data';

@Injectable()
export class UsersService {
  private users = usersData;

  findAllUsers(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      const roleList = this.users.filter((user) => user.role === role);
      if (roleList.length === 0) {
        throw new NotFoundException(`No user Found for role ${role}`);
      } else {
        return roleList;
      }
    }
    return this.users;
  }

  findUser(userId: number) {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
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

    if (userIndexToPatch === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[userIndexToPatch] = {
      ...this.users[userIndexToPatch],
      ...updateUserDto,
    };
    return this.findUser(userId);
  }

  updateUser(userId: number, createUserDto: CreateUserDto) {
    const userIndexToUpdate = this.users.findIndex(
      (user) => user.userId === userId,
    );

    if (userIndexToUpdate === -1) {
      throw new Error('User not found');
    }

    this.users[userIndexToUpdate] = {
      ...this.users[userIndexToUpdate],
      ...createUserDto,
    };
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
