import { Transform } from 'class-transformer';
import {
  IsBoolean, IsInt, IsString,
} from 'class-validator';

export class Config {
  public readonly appName = 'nestjs-boilerplate';

  @IsString()
  public readonly HOST: string = '0.0.0.0';

  @IsInt()
  @Transform(({ value }) => global.parseInt(value))
  public readonly PORT: number = 8080;

  @IsString()
  public readonly ENV: 'dev' | 'prod' = 'prod';

  @IsBoolean()
  public get isDev() {
    return this.ENV === 'dev';
  }

  @IsBoolean()
  public get isProd() {
    return this.ENV === 'prod';
  }

  @IsString()
  public readonly TOKEN_SECRET: string;

  public get serverHost() {
    return this.isDev ? `http://127.0.0.1:${this.PORT}` : process.env.SERVER_HOST;
  }
}
