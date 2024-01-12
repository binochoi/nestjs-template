/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable max-classes-per-file */
import { IsString } from 'class-validator';
import { UserEntity } from '@global/entities/User.entity';

export namespace SignIn {
  export class RequestBody {
    @IsString()
    userId: string;

    @IsString()
    password: number;
  }
  // export type Response = {
  //   list: Pick<UserEntity, 'id' | 'userId' | 'nickname' | 'role' | 'lastAccessDate'>[],
  //   count: number;
  // };
}
