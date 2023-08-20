import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(login: string, pass: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(pass, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return await this.usersService.createUser(login, result);
  }

  async signIn(login: string, pass: string) {
    const users = await this.usersService.getUserByLogin(login);

    // console.log(users);

    if (!users.length) {
      throw new NotFoundException('user not found');
    }

    const promiseUsersData = users.map(async (user) => {
      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(pass, salt, 32)) as Buffer;

      return { ...user, passInfo: { storedHash, salt, hash } };
    });

    const userData = await Promise.all(promiseUsersData);
    const user = userData.find((user) => {
      const { passInfo } = user;
      return passInfo.storedHash === passInfo.hash.toString('hex');
    });

    if (user) {
      delete user['passInfo'];
      return user;
    } else {
      throw new BadRequestException('bad password');
    }
  }
}
