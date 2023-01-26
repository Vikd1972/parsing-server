import 'reflect-metadata';
import connectToDb from './db/connectToDb';
import parsingWithCheerio from './cronJobs/parsingWithCheerio';
import parsingWithPuppeteer from './cronJobs/parsingWithPuppeteer';

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('process run');
    await connectToDb();
    parsingWithCheerio.start();
    parsingWithPuppeteer.start();
  } catch (error) {
    console.error(error);
  }
})();
