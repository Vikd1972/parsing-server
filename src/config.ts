import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}../default.env`) }).parsed;

const joinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config = {
  postgresDb: {
    host: joinedEnv.POSTGRES_DB_HOST,
    port: +joinedEnv.POSTGRES_DB_PORT,
    user: joinedEnv.POSTGRES_DB_USER,
    password: joinedEnv.POSTGRES_DB_PASSWORD,
    database: joinedEnv.POSTGRES_DB_NAME,
    logging: Boolean(joinedEnv.POSTGRES_DB_LOGGING),
  },
  port: +joinedEnv.SERVER_PORT,
  url: joinedEnv.URL_TO_PARSING,
  runCronJobs: joinedEnv.SERVER_IS_CRON_JOBS_ENABLED,
};

export default config;
