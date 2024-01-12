import {
  PgDatabase, PgTable, PgTransaction, TableConfig,
} from 'drizzle-orm/pg-core';
import { getTableColumns } from 'drizzle-orm';

/**
 * matched 객체에서 target과 일치하는 property만 남겨놓는다.
 */
export const getMatchedObject = <A extends Record<string, any>, B extends Record<string, any>> (
  matched: A,
  target: B,
) => Object.fromEntries(Object.entries(matched).filter(([key]) => key in target)) as Pick<A, keyof A & keyof B>;

/**
 * @example
 * ```ts
 * this.findMany = () => {
 *
 * }
 * ```
 */
export const extendRepository = <
  SchemaTableConfig extends TableConfig,
  Schema extends PgTable<SchemaTableConfig>,
>({ db, schema }: {
  db: PgDatabase<any, any, any>
  schema: Schema,
}) => class Repository {
  insert(params: {
    tx?: PgTransaction<any, any, any>,
    value: typeof schema._.inferInsert,
  }) {
    return params.value;
    // const {
    //   tx,
    //   value,
    // } = params;
    // return (tx || db)
    //   .insert(schema)
    //   .values(
    //     getMatchedObject(value, schema._.columns),
    //   );
  }
};
