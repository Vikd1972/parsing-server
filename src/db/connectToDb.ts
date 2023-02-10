import showMessage from '../utils/showMessage';
import dataSource from './dataSource';

const connectToDb = async () => {
  try {
    const connection = await dataSource.initialize();
    showMessage('SUCCESS', 'initiating the database', 'DB connected');

    process.on('SIGINT', async () => {
      if (!connection.isInitialized) {
        return;
      }
      await connection.destroy();
      showMessage('ERROR', 'initiating the database', 'DB connection is disconnected due to application termination');
      process.exit(0);
    });

    return connection;
  } catch (err) {
    showMessage('ERROR', 'initiating the database', `DB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectToDb;
