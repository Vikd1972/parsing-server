import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

import config from '../config';
import cheerioController from '../controller/cheerio';

let i = 0;

const parsingWithCheerio = new CronJob(
  '0 */10 * * * *',
  (() => {
    (async () => {
      try {
        const response = await nodeFetch(config.url);
        const html = await response.textConverted();
        cheerioController(html);
        // eslint-disable-next-line no-console
        console.log('checking alerts with cheerio', i++);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }),
);
export default parsingWithCheerio;
