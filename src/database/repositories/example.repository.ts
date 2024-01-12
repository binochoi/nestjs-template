import db from '../db';
import { user } from '../schema';
import { extendRepository } from './instance.repository';

class Example extends extendRepository({ db, schema: user }) {
  async insertOne() {
    return db.transaction((tx) => {
      const a = this.insert({
        tx,
        value: {
          id: 1,
        },
      });
    });
  }
}

const ex = new Example();
