/* eslint-disable @typescript-eslint/no-namespace */
import { type User } from '@global/entities/User.entity';
import { type SocialProvider } from '@global/enums/SocialProvider';
import { type Role, role } from '@global/enums/UserRole';
import { userValidation } from '@global/validations/user.validation';
import { relations } from 'drizzle-orm';
import {
  char,
  integer,
  pgTable, serial, smallint, timestamp, varchar,
} from 'drizzle-orm/pg-core';
//
namespace Table {
  export type users = Pick<User, 'id' | 'userId' | 'role' | 'nickname' | 'lastAccessDate'>;
  export type userDetails = Pick<User, 'id' | 'name' | 'phoneNumber' | 'signUpDate' | 'socialProvider'>;
  export type userSecrets = Pick<User, 'id' | 'password'>;
}
const v = userValidation;
export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', {
    length: v.userId.max,
  }).notNull().unique(),
  role: smallint('role').$type<Role>().default(role.NEWBIE).notNull(),
  nickname: varchar('nickname', {
    length: v.nickname.max,
  }).notNull().unique(),
  lastAccessDate: timestamp('last_access_date').notNull(),
} satisfies Record<keyof Table.users, unknown>);
export const userDetail = pgTable('user_details', {
  id: integer('id').notNull(),
  name: varchar('name', {
    length: v.name.max,
  }),
  phoneNumber: varchar('phone_number', {
    length: v.phoneNumber.max,
  }),
  signUpDate: timestamp('sign_up_date').notNull(),
  socialProvider: smallint('social_provider').$type<SocialProvider>(),
} satisfies Record<keyof Table.userDetails, unknown>);
const BCRYPT_HASH_LENGTH = 60;
export const userSecret = pgTable('user_secrets', {
  id: integer('id').notNull(),
  password: char('password', {
    length: BCRYPT_HASH_LENGTH,
  }),
} satisfies Record<keyof Table.userSecrets, unknown>);

export const userRelations = relations(user, ({ one }) => ({
  detail: one(userDetail),
  secret: one(userSecret),
}));
