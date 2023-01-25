import express from 'express';

import config from './config';
import job from './utils/cron-ping';

const app = express();

job.start();

void (async () => {
  try {
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });
  } catch (error) {
    console.error(error);
  }
})();