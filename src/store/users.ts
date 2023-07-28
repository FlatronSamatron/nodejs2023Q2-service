import { User } from './types';
import { v4 as uuidv4 } from 'uuid';

export class Users {
  users: User[] = [];

  constructor() {
    this.users = [
      {
        id: 'bd15d37e-26a6-4a4c-86b2-7b94ba973d19',
        login: 'vasilisk',
        password: '5',
        version: 1,
        createdAt: 1690556486610,
        updatedAt: 1690556486610,
      },
    ];
  }

  find() {
    return this.users;
  }

  findOneBy(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(login: string, password: string) {
    const user = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users = [...this.users, user];

    return user;
  }

  updateUserPassword(id: string, newPassword: string, user: User) {
    const newUser = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) => {
      return user.id === id ? newUser : user;
    });

    return newUser;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });

    return null;
  }
}
