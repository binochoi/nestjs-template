import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SessionModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
