import { IsNumber, IsIn, IsString } from 'class-validator';

const envEnum = ['dev', 'prod'] as const;
export class Config {
  @IsString()
  public readonly host = '0.0.0.0';

  @IsNumber()
  public readonly port = 3000;

  @IsIn(envEnum)
  public readonly env: typeof envEnum[number] = 'dev';

  public get isDev() {
    return this.env === 'dev';
  }

  public get isProd() {
    return this.env === 'prod';
  }

  public get serverHost() {
    return this.isDev ? `${this.host}:${this.port}` : '';
  }
}
