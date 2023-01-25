import express from 'express';
import fetch from 'node-fetch';

import config from './config';

// import job from './utils/cron-ping';
import decodeString from './utils/decodeString';
import parsingString from './utils/parsingString';

const app = express();

fetch('http://www.tgnvoda.ru/avarii.php')
  .then((res: any) => res.buffer())
  .then((res: string) => decodeString(res))
  .then((res: string) => parsingString(res))
  .catch((err: any) => console.error('\n--------------------\nБля!\n\n', err));

// job.start();

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