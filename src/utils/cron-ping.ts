import nodeFetch from 'node-fetch';
import { CronJob } from 'cron';

// import decodeString from './decodeString';
// import parsingString from './parsingString';

const job = new CronJob(
  '*/5 * * * * *',
  (() => {
    (async () => {
      try {
        const response = await nodeFetch('http://www.tgnvoda.ru/avarii.php');
        const html = await response.textConverted();
        // eslint-disable-next-line no-console
        console.log(html);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
    // fetch('http://www.tgnvoda.ru/avarii.php')
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   .then((res: Response) => res.buffer())
    //   .then((res: string) => decodeString(res))
    //   .then((res: string) => parsingString(res))
    //   .catch((err: string) => console.error(err));
  }),
);
export default job;
