import requireDirectory from 'require-directory';
import type { RequireDirectoryResult } from 'require-directory';
import type { CronJobParameters } from 'cron';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

type ModulesType = RequireDirectoryResult<CronJobParameters>;

const modules: ModulesType = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
});
const runProcesses = () => {
  log.start('checking alerts with cheerio %s, checking alerts with puppeteer %s');
  Object.values(modules).forEach((job) => {
    Object.values(job)[0].start();
  });
};

export default runProcesses;
