import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const client = new Pool({
  host: '34.22.67.164',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: 'postgres',
  password: 'qbt8w7!%^23h',
  database: 'yeo-tiger',
});
const db = drizzle(client, { schema });
export {
  client,
};
export default db;
