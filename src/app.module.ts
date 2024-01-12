import { Module } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { AppController } from './app.controller';
import { Config } from './config';
import { SessionModule } from './modules/session/session.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: Config,
      load: dotenvLoader({
        keyTransformer: (key: string) => key.toLowerCase(),
      }),
    }),
    SessionModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
