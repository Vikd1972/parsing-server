import 'reflect-metadata';

import './module';

import connectToDb from './db/connectToDb';
import runProcesses from './cronJobs';
// import avitoController from './controller/avitoContriller';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

log.info('start cron node process');
(async () => {
  try {
    await connectToDb();
    // avitoController();
    runProcesses();
  } catch (error) {
    log.e(error);
  }
})();
