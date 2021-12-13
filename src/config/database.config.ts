import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'jade',
  entities: [
    join(__dirname, './../modules/**/*.entity{.ts,.js}'),
    join(__dirname, '/../modules/**/**/*.entity{.ts,.js}'),
  ],
  synchronize: true,
};
