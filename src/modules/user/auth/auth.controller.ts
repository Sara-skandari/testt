import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from './auth.service';
import { VerifyCodeDto } from '../dto/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<boolean> {
    return await this.authService.register(registerDto);
  }

  @Post('/verifyCode')
  async verifyCode(@Body(ValidationPipe) verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyCode(verifyCodeDto);
  }
}
