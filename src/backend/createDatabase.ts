import fs from 'fs';
import sqlite3 from 'sqlite3';

import { dbPath } from './params';

export default function createDatabase() {
  const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) throw new Error(err);
  });

  const creationSql = fs
    .readFileSync('./src/backend/createScript.sql')
    .toString();

  db.serialize(() => {
    db.run('BEGIN TRANSACTION;');
    db.run(creationSql.toString());
    db.run('COMMIT;');
  });

  db.close((err: any) => {
    if (err) throw new Error(err.message);
  });
}
