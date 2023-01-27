import 'reflect-metadata';

import './module';

import connectToDb from './db/connectToDb';
import runProcesses from './cronJobs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

log.info('start cron node process');
(async () => {
  try {
    await connectToDb();
    runProcesses();
  } catch (error) {
    log.e(error);
  }
})();
