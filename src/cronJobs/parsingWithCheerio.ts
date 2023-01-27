import { CronJob } from 'cron';

import cheerioController from '../controller/cheerio';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const parsingWithCheerio = new CronJob(
  '0 */10 * * * *',
  (() => {
    (async () => {
      try {
        cheerioController(config.url);
        log.step();
      } catch (error) {
        // eslint-disable-next-line no-console
        log.e(error);
      }
    })();
  }),
);

export default parsingWithCheerio;
