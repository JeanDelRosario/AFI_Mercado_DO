import { Pool, QueryResult, Query } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
  })

const queryDatabase = (
  text: string,
  callback: (err: Error, result: QueryResult) => void
  ) : any => {
  return pool.query(text, callback)
}
export {queryDatabase};