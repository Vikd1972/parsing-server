import fetch from 'node-fetch';
import { CronJob } from 'cron';

import decodeString from './decodeString';
import parsingString from './parsingString';

const job = new CronJob(
  '*/5 * * * * *',
  (() => {
    fetch('http://www.tgnvoda.ru/avarii.php')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => res.buffer())
      .then((res: string) => decodeString(res))
      .then((res: string) => parsingString(res))
      .catch((err: string) => console.error(err));
  }),
);

export default job;
