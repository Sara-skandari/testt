import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PhoneEmailValidation } from './auth/phone-email-validation.entity';
import { PhoneEmailValidationRepository } from './auth/phone-email-validation.repository';

@Module({
  imports: [
    ProfileModule,
    AuthModule,
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      PhoneEmailValidation,
      PhoneEmailValidationRepository,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
