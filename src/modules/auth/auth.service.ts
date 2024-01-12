import { Injectable } from '@nestjs/common';
import { SignIn } from '@global/DTOs/auth.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) { /** */ }

  async signIn(params: SignIn.RequestBody) {
    const user = await this.userService.findOne({ searchBy: 'userId', searchValue: params.userId });
    if (user === null) {
      throw new BadRequestException();
    }
    this.sessionService.insertOne();
  }

  signUp() {

  }

  signInSocial() {

  }
}
