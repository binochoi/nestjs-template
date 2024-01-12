import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config';
import { SessionService } from './session.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [Config],
      useFactory: async (config: Config) => ({
        secret: config.tokenSecret,
      }),
    }),
  ],
  providers: [SessionService, TokenService],
  exports: [SessionService],
})
export class SessionModule {}
