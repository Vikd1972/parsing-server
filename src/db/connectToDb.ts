import dataSource from './dataSource';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    // eslint-disable-next-line no-console
    log.info('DB connected');

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      // eslint-disable-next-line no-console
      console.log('DB connection is disconnected due to application termination');
      process.exit(0);
    });

    return connection;
  } catch (err) {
    console.error('DB connection error: ', err.message);
    process.exit(1);
  }
};

export default connectToDb;
