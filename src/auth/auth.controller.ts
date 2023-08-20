import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.login, body.password);
  }

  @Post('/login')
  @HttpCode(201)
  signIn(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.login, body.password);
  }
}
