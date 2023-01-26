import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

import parsingString from './parsingString';

const job = new CronJob(
  '0 */10 * * * *',
  (() => {
    (async () => {
      try {
        const response = await nodeFetch('http://www.tgnvoda.ru/avarii.php');
        const html = await response.textConverted();
        parsingString(html);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }),
);
export default job;
