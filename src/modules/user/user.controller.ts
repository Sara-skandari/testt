import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../../dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.createUser(userDto);
  }
}
