// import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

// import config from '../config';
// import cheerioController from '../controller/cheerio';
// import puppetterController from 'src/controller/puppetter';

let i = 0;

const parsingWithPuppeteer = new CronJob(
  '0 */2 * * * *',
  (() => {
    (async () => {
      try {
        // const response = await nodeFetch(config.url);
        // const html = await response.textConverted();
        // puppetterController(html);
        // eslint-disable-next-line no-console
        console.log('checking alerts with puppeteer', i++);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }),
);
export default parsingWithPuppeteer;
