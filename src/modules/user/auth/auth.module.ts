import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user.module';
import { UserRepository } from '../user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Session } from './session.entity';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';
import { PhoneEmailValidation } from './phone-email-validation.entity';
import { PhoneEmailValidationRepository } from './phone-email-validation.repository';
import { User } from '../user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Session,
      User,
      UserRepository,
      SessionRepository,
      PhoneEmailValidation,
      PhoneEmailValidationRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionService],
})
export class AuthModule {}
