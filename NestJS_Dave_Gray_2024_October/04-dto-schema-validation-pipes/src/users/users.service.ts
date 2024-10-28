import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { usersData } from './user-data';
import { CreateUserDto, ROLE } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = usersData;

  findAllUsers(role?: string) {
    //--- solution 1 : /* Is it really necessary ? */
    // if (role) {
    //   const roleList = this.users.filter((user) => user.role === role);
    //   if (roleList.length === 0) {
    //     throw new NotFoundException(`No user Found for role ${role}`);
    //   } else {
    //     return roleList;
    //   }
    // }

    //--- solution 2
    const roles = Object.values(ROLE) as ROLE[];
    if (role) {
      // Convert role to uppercase and assert as enum type
      const uppercaseRole = role.toUpperCase() as keyof typeof ROLE;

      /* Is it really necessary ? */
      // Check if uppercaseRole is a valid member of ROLE
      if (!roles.includes(uppercaseRole as ROLE)) {
        throw new BadRequestException(`${role} is not defined as a known role`);
      }
      return this.users.filter((user) => user.role === uppercaseRole);
    }

    return this.users;
  }

  findOneUser(userId: number) {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  createUser(user: CreateUserDto) {
    this.users = [...this.users, { userId: new Date().getTime(), ...user }];
    return this.findAllUsers();
  }

  patchOneUser(userId: number, userData: PatchUserDto) {
    const userToPatchIndex = this.users.findIndex(
      (user) => user.userId === userId,
    );

    if (userToPatchIndex == -1) {
      console.log('user not found !');
      throw new NotFoundException();
    }

    this.users[userToPatchIndex] = {
      ...this.users[userToPatchIndex],
      ...userData,
    };
    return this.findOneUser(userId);
  }

  updateOneUser(userId: number, userData: UpdateUserDto) {
    const userToUpdateIndex = this.users.findIndex(
      (user) => user.userId === userId,
    );

    if (userToUpdateIndex == -1) {
      console.log('user not found !');
      throw new NotFoundException();
    }

    this.users[userToUpdateIndex] = {
      ...this.users[userToUpdateIndex],
      ...userData,
    };
    return this.findOneUser(userId);
  }

  deleteOneUser(userId: number) {
    const userIndexToDelete = this.users.findIndex(
      (user) => user.userId === userId,
    );
    if (userIndexToDelete === -1) {
      console.log(' user Not found !');
      throw new NotFoundException();
    }
    this.users.splice(userIndexToDelete, 1);
    return this.findAllUsers();
  }
}
