import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
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
  getUser(@Param('id', new ParseUUIDPipe()) id: string) {
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.removeUser(id);
  }
}
