import { SetOptional } from 'type-fest';
import { UserEntity } from '@global/entities/User.entity';
import { role } from '@global/enums/UserRole';
import { Injectable } from '@nestjs/common';
import dayjs = require('dayjs');
import { UserRepository } from 'src/database/repositories/user.repository';

type Parameter<T extends (...args: any) => any> = Parameters<T>[0];
@Injectable()
export class UserService {
  private readonly repo = new UserRepository();

  findOne(params: Parameter<UserRepository['findOne']>) {
    return this.repo.findOne(params);
  }

  insertOne(user: SetOptional<Omit<UserEntity, 'lastAccessDate' | 'role' | 'signUpDate'>, 'phoneNumber'>) {
    return this.repo.insert({
      phoneNumber: null,
      ...user,
      role: role.NEWBIE,
      lastAccessDate: dayjs().toDate(),
      signUpDate: dayjs().toDate(),
    });
  }
}
