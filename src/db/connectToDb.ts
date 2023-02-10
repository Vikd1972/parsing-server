/* eslint-disable no-console */
import dataSource from './dataSource';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    console.log('\u2554==================');
    console.log('\u2551', '\x1b[32m', 'DB connected', '\x1b[0m');
    console.log('\u255A==================');

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      console.log('\u2554==================');
      console.log('\u2551', '\x1b[31m', 'DB connection is disconnected due to application termination', '\x1b[0m');
      console.log('\u255A==================');
      process.exit(0);
    });

    return connection;
  } catch (err) {
    console.log('\u2554==================');
    console.log('\u2551', '\x1b[31m', 'DB connection error: ', err.message, '\x1b[0m');
    console.log('\u255A==================');
    process.exit(1);
  }
};

export default connectToDb;
