// import {
//   varchar, serial, pgTable, smallint, integer, timestamp, char, boolean,
// } from 'drizzle-orm/pg-core';
// import { type User } from '@global/entities/user.entity';
// import { SocialProvider } from '@global/types/SocialProvider';
// import { UserStatus, userStatus } from '@global/types/UserStatus';
// import { UserRole as Role, userRole as role } from '@global/types/UserRole';
//
// export const validation = {
//   userId: {
//     min: 5,
//     max: 20,
//     matches: {
//       default: /^[a-z][a-z0-9]+$/,
//     },
//   },
//   nickname: {
//     min: 2,
//     max: 10,
//   },
//   password: {
//     min: 8,
//     max: 25,
//     matches: {
//       default: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/,
//     },
//   },
//   name: {
//     min: 2,
//     max: 10,
//   },
//   phoneNumber: {
//     max: 20,
//     min: 10,
//   },
// };
// type Users = Pick<User, 'id' | 'userId' | 'role' | 'nickname' | 'status' | 'lastAccessDate'>;
// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   userId: varchar('user_id', {
//     length: validation.userId.max,
//   }).notNull().unique(),
//   role: smallint('role').$type<Role>().default(role.NEWBIE).notNull(),
//   nickname: varchar('nickname', {
//     length: validation.nickname.max,
//   }).notNull().unique(),
//   status: smallint('status')
//     .$type<UserStatus>()
//     .default(userStatus.ACTIVED),
//   lastAccessDate: timestamp('last_access_date').notNull(),
// } satisfies Record<keyof Users, unknown>);
//
// type UsersDetail = Pick<User, 'id' | 'name' | 'phoneNumber' | 'signUpDate' | 'socialProvider' | 'isReceiveSMS'>;
// export const usersDetail = pgTable('users_detail', {
//   id: integer('id').notNull(),
//   name: varchar('name', {
//     length: validation.name.max,
//   }),
//   phoneNumber: varchar('phone_number', {
//     length: validation.phoneNumber.max,
//   }),
//   signUpDate: timestamp('sign_up_date').notNull(),
//   socialProvider: smallint('social_provider').$type<SocialProvider>(),
//   isReceiveSMS: boolean('is_receive_sms').default(false),
// } satisfies Record<keyof UsersDetail, unknown>);
//
// type UsersSecret = Pick<User, 'id' | 'password'>;
// const BCRYPT_HASH_LENGTH = 60;
// export const usersSecret = pgTable('users_secret', {
//   id: integer('id').notNull(),
//   password: char('password', {
//     length: BCRYPT_HASH_LENGTH,
//   }),
// } satisfies Record<keyof UsersSecret, unknown>);
//
// export const userProduct = pgTable('user_products', {
//   id: serial('id').notNull(),
//   userIdx: integer('user_idx').notNull(),
// });
