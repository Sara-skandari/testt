import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Not Empty' })
  name: string;

  @IsEmail({}, { message: 'input email' })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;
}
