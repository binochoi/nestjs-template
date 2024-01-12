import { Role } from '@global/enums/UserRole';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AccessToken, RefreshToken } from 'src/types/Token.type';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) { /** */ }

  generate(payload: {
    nickname: string;
    role: Role,
    sessionId: string;
  }) {
    const { sessionId, ...restPayload } = payload;
    const accessToken = this.jwtService.signAsync(restPayload);
    const refreshToken = this.jwtService.signAsync(sessionId);
    return {
      accessToken,
      refreshToken,
    };
  }

  verify<Token extends object>(token: string): Promise<Token> {
    return this.jwtService.verifyAsync<Token>(token);
  }

//   decode(token: string) {
//     return this.jwtService.decode(token);
//   }
}
