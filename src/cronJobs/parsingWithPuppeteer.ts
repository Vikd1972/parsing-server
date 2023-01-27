import { CronJob } from 'cron';

import puppetterController from '../controller/puppetter';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const parsingWithPuppeteer = new CronJob(
  '0 */5 * * * *',
  (() => {
    (async () => {
      try {
        puppetterController(config.url);
        log.step(0, 1);
      } catch (error) {
        // eslint-disable-next-line no-console
        log.e(error);
      }
    })();
  }),
);

export default parsingWithPuppeteer;
