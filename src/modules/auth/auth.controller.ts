import {
  Controller, Post, Get, Res, Body,
} from '@nestjs/common';
import { SignIn, SignUp } from '@global/DTOs/auth.dto';
import { FastifyReply } from 'fastify';
import dayjs = require('dayjs');
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../session/session.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { /** */ }

  private setTokenCookies(res: FastifyReply, { accessToken, refreshToken }: Record<'accessToken' | 'refreshToken', string>) {
    res.setCookie('access_token', accessToken, {
      sameSite: true,
      httpOnly: true,
      secure: true,
      expires: dayjs().add(ACCESS_TOKEN_EXPIRES).toDate(),
    });
    res.setCookie('refresh_token', refreshToken, {
      sameSite: true,
      httpOnly: true,
      secure: true,
      expires: dayjs().add(REFRESH_TOKEN_EXPIRES).toDate(),
    });
  }

  @Post('signin')
  async signIn(
    @Res() res: FastifyReply,
    @Body() form: SignIn.RequestBody,
  ) {
    const info = await this.authService.signIn(form);
    this.setTokenCookies(res, info);
    res.send(info.accessUser);
  }

  @Post('signup')
  async signUp(
    @Res() res: FastifyReply,
    @Body() form: SignUp.RequestBody,
  ) {
    const info = await this.authService.signUp(form);
    this.setTokenCookies(res, info);
    res.send(info.accessUser);
  }

  @Get('callback')
  signInSocial() {

  }
}
