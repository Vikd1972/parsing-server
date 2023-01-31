import requireDirectory from 'require-directory';
import type { RequireDirectoryResult } from 'require-directory';
import type { CronJobParameters } from 'cron';
import { CronJob } from 'cron';

import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

type OptionsType = {
  name: string;
  default?: CronJobParameters;
  index?: { default: CronJobParameters };
};

type ModulesType = RequireDirectoryResult<OptionsType>;

const modules: ModulesType = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
});

const itemCron: {
  name: string;
  params: CronJobParameters;
} = { name: '', params: null };

const cronJobsList: Array<typeof itemCron> = [];

Object.entries(modules).forEach((key) => {
  const itemCron = {
    name: key[0] as string,
    // eslint-disable-next-line max-len
    params: key[1].default ? key[1].default as CronJobParameters : key[1].index.default as CronJobParameters,
  };
  cronJobsList.push(itemCron);
});

const runProcesses = () => {
  if (config.runCronJobs) {
    log.start('checking alerts with cheerio %s, checking alerts with puppeteer %s, checking test1 %s, , parsingAvito %s');
    cronJobsList.forEach((job) => {
      log.info(job.name, 'is running');
      const newJob = new CronJob(job.params);
      newJob.start();
    });
  }
  // const runCronJobs = () => {

  // };

  // Object.entries(modules).forEach((xxx, job) => {
  //   console.log(xxx, job);
  //   // Object.values(job)[0].start();
  // });
};

export default runProcesses;
