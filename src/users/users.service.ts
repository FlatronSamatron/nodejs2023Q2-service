import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { store } from '../store/store';
import { UpdateUserPasswordDto } from './dtos/update-userPassword.dto';

@Injectable()
export class UsersService {
  getAllUsers() {
    return store.users.find();
  }
  getUser(id: string) {
    const user = store.users.findOneBy(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  createUser(login: string, pass: string) {
    return store.users.create(login, pass);
  }
  updateUserPassword(id: string, body: UpdateUserPasswordDto) {
    const user = store.users.findOneBy(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    return store.users.updateUserPassword(id, body.newPassword, user);
  }
  removeUser(id: string) {
    const user = store.users.findOneBy(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return store.users.remove(id);
  }
}
