import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

type Parameter<T extends (...args: any) => any> = Parameters<T>[0];
@Injectable()
export class UserService {
  private readonly repo = new UserRepository();

  findOne(params: Parameter<UserRepository['findOne']>) {
    return this.repo.findOne(params);
  }
}
