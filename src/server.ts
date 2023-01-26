import 'reflect-metadata';
import express from 'express';

import config from './config';
import connectToDb from './db/connectToDb';

// import job from './utils/cron-ping';
import getContent from './utils/getContent';

const app = express();
connectToDb();

// job.start();
getContent();

(async () => {
  try {
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });
  } catch (error) {
    console.error(error);
  }
})();
