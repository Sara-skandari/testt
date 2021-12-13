import { EntityRepository, MongoRepository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { ValidationType } from './auth/phone-email-validation.entity';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {
  async createUser(registerUserDto: RegisterDto): Promise<User> {
    const user = new User();
    user.fullname = registerUserDto.fullname;
    user.email = registerUserDto.email;
    user.phone = registerUserDto.phone;
    user.password = registerUserDto.password;
    return await user.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.manager.findOne(User, { username: username });
  }

  async activeUserPhoneOrEmail(
    user: User,
    verType: ValidationType,
  ): Promise<User> {
    if (verType === ValidationType.EMAIL) user.emailVerification = true;
    if (verType === ValidationType.PHONE) user.phoneVerification = true;

    return await user.save();
  }
}
