import { Controller, Post, Get } from '@nestjs/common';
import { SignIn } from '@global/DTOs/auth.dto';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() form: SignIn.RequestBody) {
    return this.authService.signIn(form);
  }

  @Post()
  signUp() {

  }

  @Get('callback')
  signInSocial() {

  }
}
