import { Role } from '@global/enums/UserRole';

export interface AccessToken {
  nickname: string;
  role: Role,
}

export type RefreshToken = string;
