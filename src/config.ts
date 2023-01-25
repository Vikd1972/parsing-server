// Get data from the .env and default.env files.

const config = {
  postgresDb: {
    host: 'host from the env',
    port: Number('port from the env'),
    user: 'user from the env',
    password: 'password from the env',
    database: 'database from the env',
    logging: Boolean('logging from the env'),
  },
  port: 5001,
};

export default config;
