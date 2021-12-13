import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(40, { message: 'Error Max' })
  @MinLength(5, { message: 'Min 5' })
  fullname: string;

  @IsOptional()
  @IsString()
  @Length(11, 12, { message: 'Phone is not correct' })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Your email is not correct' })
  email?: string;

  @IsNotEmpty({ message: 'This field must not be empty' })
  @MaxLength(20, { message: 'Password must be less than 20 characters' })
  @MinLength(8, { message: 'Password must be more than 8 characters' })
  @Matches(
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is not secure' },
  )
  password: string;

  @IsNotEmpty({ message: 'Confirm field must not be empty' })
  @IsString()
  confirmPassword: string;
}
