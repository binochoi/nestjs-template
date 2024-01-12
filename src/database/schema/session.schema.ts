/* eslint-disable @typescript-eslint/no-namespace */
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
export const session = pgTable('user_sessions', {
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

export const userRelations = relations(session, ({ one }) => ({
  detail: one(userDetail),
  secret: one(userSecret),
}));
