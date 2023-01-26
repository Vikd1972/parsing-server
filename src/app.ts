import 'reflect-metadata';
import connectToDb from './db/connectToDb';
import parsingWithCheerio from './cronJobs/parsingWithCheerio';

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('process run');
    await connectToDb();
    parsingWithCheerio.start();
  } catch (error) {
    console.error(error);
  }
})();
