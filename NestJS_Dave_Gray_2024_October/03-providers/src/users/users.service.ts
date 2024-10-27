import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      userId: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      userId: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      userId: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      userId: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAllUsers(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOneUser(userId: string) {
    return this.users.find((user) => user.userId === parseInt(userId, 10));
  }

  createUser(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER';
  }) {
    this.users = [...this.users, { userId: new Date().getTime(), ...user }];
    return this.findAllUsers();
  }

  patchOneUser(
    userId: string,
    userData: Partial<{
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    }>,
  ) {
    const userToPatchIndex = this.users.findIndex(
      (user) => user.userId === parseInt(userId),
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

  updateOneUser(
    userId: string,
    userData: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    const userToUpdateIndex = this.users.findIndex(
      (user) => user.userId === parseInt(userId),
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

  deleteOneUser(userId: string) {
    const userIndexToDelete = this.users.findIndex(
      (user) => user.userId === parseInt(userId),
    );
    if (userIndexToDelete === -1) {
      console.log(' user Not found !');
      throw new NotFoundException();
    }
    this.users.splice(userIndexToDelete, 1);
    return this.findAllUsers();
  }
}
