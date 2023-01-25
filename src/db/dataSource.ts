import { DataSource } from 'typeorm';
import path from 'path';

import config from '../config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.postgresDb.host,
  port: config.postgresDb.port,
  username: config.postgresDb.user,
  password: config.postgresDb.password,
  database: config.postgresDb.database,
  logging: config.postgresDb.logging,
  synchronize: false,
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
  entities: [path.normalize(`${__dirname}/entities/**/*.{ts,js}`)],
  migrations: [path.normalize(`${__dirname}/migrations/*.{ts,js}`)],
});

export default dataSource;
