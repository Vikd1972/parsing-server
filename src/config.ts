// Get data from the .env and default.env files.

const config = {
  postgresDb: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'parsing',
    logging: false,
  },
  port: 5001,
};

export default config;
