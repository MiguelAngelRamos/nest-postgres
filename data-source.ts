import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { join } from 'path';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname + '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migration', '*.{ts, js}')],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;

