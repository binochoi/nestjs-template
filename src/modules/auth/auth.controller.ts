import {
  Controller, Post, Get, Res, Body, UseGuards, Query,
} from '@nestjs/common';
import { SignIn, SignUp } from '@global/DTOs/auth.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import dayjs = require('dayjs');
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'passport-google-oauth20';
import { Req } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from '../session/session.constant';

const GoogleGuard = () => UseGuards(AuthGuard('google'));
const NaverGuard = () => UseGuards(AuthGuard('naver'));
const TwitterGuard = () => UseGuards(AuthGuard('twitter'));

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

  @Get('test')
  googleTest(@Res() res: FastifyReply) {
    res.setCookie('__payload__', 'success !');
    res.status(301).redirect('http://localhost:3000/auth/google');
  }

  @GoogleGuard()
  @Get('google')
  googleLogin() {}

  @NaverGuard()
  @Get('naver')
  twitterLogin() {}

  @GoogleGuard()
  @Get('callback')
  authSocial(
    @Req() { user }: FastifyRequest & { user: Profile },
    @Res() res: FastifyReply,
    @Query() query: any,
  ) {
    // const { cookies } = res;
    // is exist
    // if signin
    // else signup
    return {
      user,
      query,
      // cookies,
    };
  }
}
