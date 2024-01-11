import { desc, eq, sql } from 'drizzle-orm';
import { FindMany, FindOne } from '@global/DTOs/user.dto';
import db from '../db';
import { user, userDetail } from '../schema';

export class UserRepository {
  async findMany({ page, count }: FindMany.RequestQuery): Promise<FindMany.Response> {
    const offset = (page - 1) * count;
    const limit = page * count;

    return db.query.user.findMany({
      extras: {
        count: sql<number>`count(*) over()`.as('count'),
      },
      offset,
      limit,
      orderBy: desc(user.id),
    })
      .then((records) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        list: records.map(({ count: _, ...record }) => record),
        count: records[0] ? records[0].count : 0,
      }));
  }

  async findOne({ searchBy, searchValue }: FindOne.RequestQuery) {
    const getWhere = (value: number | string) => {
      const column = searchBy in user ? user[searchBy as keyof typeof user.$inferSelect] : userDetail[searchBy as keyof typeof userDetail.$inferSelect];
      return eq(column, value);
    };
    return db.query.user.findFirst({
      with: {
        detail: true,
        secret: true,
      },
      where: getWhere(searchValue),
    });
  }
}
