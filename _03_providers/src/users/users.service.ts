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
    return this.users.find((user) => user.userId === parseInt(userId));
  }

  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'INTERN' | 'ENGINEER';
  }) {
    this.users = [...this.users, { userId: new Date().getTime(), ...user }];
    return this.users;
  }

  patchOneUser(
    userId: string,
    user: Partial<{
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    }>,
  ) {
    const userIndexToPatch = this.users.findIndex(
      (user) => user.userId === parseInt(userId),
    );

    if (userIndexToPatch === -1) {
      console.log(' user Not found !');
      throw new NotFoundException();
    }

    this.users[userIndexToPatch] = { ...this.users[userIndexToPatch], ...user };
    return this.findOneUser(userId);
  }

  updateOneUser(
    userId: string,
    user: {
      name: string;
      email: string;
      role: 'ADMIN' | 'INTERN' | 'ENGINEER';
    },
  ) {
    const userIndexToUpdate = this.users.findIndex(
      (user) => user.userId === parseInt(userId),
    );

    if (userIndexToUpdate === -1) {
      console.log(' user Not found !');
      throw new NotFoundException();
    }

    this.users[userIndexToUpdate] = { userId: parseInt(userId), ...user };
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
    return this.users;
  }
}
