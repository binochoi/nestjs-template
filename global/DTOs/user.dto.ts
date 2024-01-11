/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable max-classes-per-file */
import { IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '@global/entities/User.entity';

export namespace FindMany {
  export class RequestQuery {
    @Type(() => Number)
    @IsNumber()
    page: number;

    @Type(() => Number)
    @IsNumber()
    count: number;
  }
  export type Response = {
    list: Pick<UserEntity, 'id' | 'userId' | 'nickname' | 'role' | 'lastAccessDate'>[],
    count: number;
  };
}

export namespace FindOne {
  export class RequestQuery {
    @IsIn(['id', 'name', 'nickname', 'password', 'phoneNumber', 'role'] satisfies (keyof UserEntity)[])
      searchBy: keyof UserEntity;

    searchValue: number | string;
  }
}
