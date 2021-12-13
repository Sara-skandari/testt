import { BadRequestException, Injectable } from '@nestjs/common';
import e from 'express';
import { Connection } from 'typeorm';
import { UserDto } from '../../dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private connection: Connection,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    try {
      const res = await this.userRepo.save(userDto);
      return res;
    } catch (err) {
      console.log(err);
      if (err.code === 11000)
        throw new BadRequestException('نام کاربری وجود دارد');
    }
  }
}
