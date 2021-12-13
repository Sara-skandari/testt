import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';
import {
  PhoneEmailValidation,
  ValidationType,
} from './phone-email-validation.entity';

@EntityRepository(PhoneEmailValidation)
export class PhoneEmailValidationRepository extends Repository<PhoneEmailValidation> {
  async createValidation(
    user: User,
    code: number,
  ): Promise<PhoneEmailValidation> {
    const phoneEmailValidation = new PhoneEmailValidation();
    phoneEmailValidation.code = code;
    phoneEmailValidation.userId = user._id;
    phoneEmailValidation.username = user.username;
    return await phoneEmailValidation.save();
  }

  async setUsedCode(item: PhoneEmailValidation): Promise<PhoneEmailValidation> {
    item.isUsed = true;
    return await item.save();
  }
}
