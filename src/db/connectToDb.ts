import dataSource from './dataSource';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();

    // eslint-disable-next-line no-console
    console.log(
      'DB connected',
      { color: 'blue', font: 'small', immediateLog: true, topGap: true },
    );

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
