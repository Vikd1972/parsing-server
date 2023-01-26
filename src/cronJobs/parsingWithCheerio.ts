import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

import parsingString from '../utils/parsingString';

let i = 0;

const parsingWithCheerio = new CronJob(
  '0 */10 * * * *',
  (() => {
    (async () => {
      try {
        const response = await nodeFetch('http://www.tgnvoda.ru/avarii.php');
        const html = await response.textConverted();
        parsingString(html);
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
