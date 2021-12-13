import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsArray()
  @IsOptional()
  skills: string[];
}
