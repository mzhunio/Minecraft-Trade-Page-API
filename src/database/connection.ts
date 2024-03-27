import mysql, { Pool, PoolOptions } from "mysql2/promise";

const poolOptions: PoolOptions = {
  //socketPath: "/tmp/mysql.sock",
  host: "localhost",
  user: "root",
  password: "password",
  database: "minecraft",
  connectionLimit: 10,
};

export const pool: Pool = mysql.createPool(poolOptions);