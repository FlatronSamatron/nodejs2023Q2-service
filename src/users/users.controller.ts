import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { idDto } from '../id.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserPasswordDto } from './dtos/update-userPassword.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param() { id }: idDto) {
    const user = this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.login, body.password);
  }

  @Put('/:id')
  updateUserPassword(
    @Param() { id }: idDto,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param() { id }: idDto) {
    return this.usersService.removeUser(id);
  }
}
