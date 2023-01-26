import { CronJob } from 'cron';

import getContent from './getContent';

const job = new CronJob(
  '0 */10 * * * *',
  (() => {
    getContent();
  }),
);

export default job;
