import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateProfileDto } from '../../../dto/create-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileServic: ProfileService) {}

  @Post()
  async createProfile(
    @Body(ValidationPipe) createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileServic.createProfile(createProfileDto);
  }
}
