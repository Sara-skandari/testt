import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../user.repository';
import { SessionRepository } from './session.repository';
import { Tools } from '../../../utils/tools';
import { sendVerificationEmail } from '../../../utils/mailer';
import { ValidationType } from './phone-email-validation.entity';
import { PhoneEmailValidationRepository } from './phone-email-validation.repository';
import { VerifyCodeDto } from '../dto/verify-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private phoneEmailValidationRepo: PhoneEmailValidationRepository,
  ) {}

  async register(registerUserDto: RegisterDto) {
    // if(registerUserDto.password !== registerUserDto.confirmPassword)
    //     throw new BadRequestException('Password Not Equal To Confirm')

    // create user object
    const username = registerUserDto.email
      ? registerUserDto.email
      : registerUserDto.phone;
    let user;
    try {
      console.log(`searching for ${username}`);
      user = await this.userRepository.findOne({ username: username });
    } catch (err) {
      console.log(err);
    }

    if (!user) user = await this.userRepository.createUser(registerUserDto);

    // generate validation code
    const code = Tools.generateValidationCode(6);

    // send email or sms to user
    if (registerUserDto.email) {
      // send email to user
      const emailRes = await sendVerificationEmail(registerUserDto.email, code);
      if (!emailRes)
        throw new BadRequestException(
          `Server Can't Send Email To ${registerUserDto.email}`,
        );
      console.log(`Verification Email Sent To ${registerUserDto.email}`);
    } else if (registerUserDto.phone) {
      // send sms to user
      //TODO add sms service to send sms
      throw new BadRequestException('This Error Is Temp Becouse Not Set Yet');
    } else {
      throw new BadRequestException('Please Add Email Or Phone Number');
    }

    const emailVal = await this.phoneEmailValidationRepo.createValidation(
      user,
      code,
    );
    if (registerUserDto.email) emailVal.type = ValidationType.EMAIL;
    else if (registerUserDto.phone) emailVal.type = ValidationType.PHONE;
    else throw new BadRequestException('Please Add Email Or Phone Number');

    return true;

    // create jwt token
    // const payload: Payload = { id: user.id , username: user.username }
    // const token = jwt.sign(payload , 'test' , { expiresIn: '10m' })
    // create session object
    // const session = await this.sessionRepository.createSession(user, token, Action.SignUp)
    // res jwt token
    // return token;
  }

  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    // search the code from db
    const username = verifyCodeDto.email
      ? verifyCodeDto.email
      : verifyCodeDto.phone;
    const phoneEmailVal = await this.phoneEmailValidationRepo.findOne({
      code: verifyCodeDto.code,
      username: username,
      isUsed: false,
    });
    // check if exist and not used and not expired
    if (!phoneEmailVal || phoneEmailVal.expireAt < new Date()) {
      throw new BadRequestException('Code Is Invalid');
    }
    // if code is valid update db to used code
    const setToUsed = await this.phoneEmailValidationRepo.setUsedCode(
      phoneEmailVal,
    );
    // generate jwt code res token and save it in session
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new BadRequestException('User Not Found');

    const setUserVerification =
      await this.userRepository.activeUserPhoneOrEmail(
        user,
        verifyCodeDto.email ? ValidationType.EMAIL : ValidationType.PHONE,
      );
  }
}
