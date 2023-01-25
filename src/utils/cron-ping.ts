var CronJob = require('cron').CronJob;
import memoryData from './memoryData';

const job = new CronJob(
  '*/10 * * * * *',
  function () {
    memoryData();
  },
  // null,
  // true,
  // 'America/Los_Angeles'
);

export default job;
