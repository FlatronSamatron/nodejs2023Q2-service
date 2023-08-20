import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserPasswordDto } from './dtos/update-userPassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  getAllUsers() {
    return this.repo.find();
  }

  async getUserByLogin(login) {
    return this.repo.find({ where: { login } });
  }

  async getUser(id: string) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
  createUser(login: string, pass: string) {
    const user = this.repo.create({
      id: uuidv4(),
      login,
      password: pass,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return this.repo.save(user);
  }
  async updateUserPassword(id: string, body: UpdateUserPasswordDto) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.repo.save({
      ...user,
      password: body.newPassword,
      version: user.version + 1,
      createdAt: Number(user.createdAt),
      updatedAt: Date.now(),
    });
  }
  async removeUser(id: string) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}
