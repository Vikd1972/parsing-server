/* eslint-disable no-console */
import 'reflect-metadata';

import './module';

import connectToDb from './db/connectToDb';
import runProcesses from './cronJobs';

(async () => {
  try {
    await connectToDb();
    runProcesses();
  } catch (error) {
    console.log('\u2554==================');
    console.log('\u2551', '\x1b[31m', error, '\x1b[0m');
    console.log('\u255A==================');
  }
})();
