import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateProfileDto } from '../../../dto/create-profile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    // profile.user = user
    profile.image = createProfileDto.image;
    profile.bio = createProfileDto.bio;
    profile.skills = createProfileDto.skills;
    return await profile.save();
  }
}
