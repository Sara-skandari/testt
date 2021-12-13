import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsNumber()
  code: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;
}
