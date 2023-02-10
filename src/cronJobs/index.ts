import requireDirectory from 'require-directory';
import type { RequireDirectoryResult } from 'require-directory';
import type { CronJobParameters } from 'cron';
import { CronJob } from 'cron';

import config from '../config';
import showMessage from '../utils/showMessage';

type CronJobParamsType = Omit<CronJobParameters, 'onTick'> & { onTick: () => Promise<void> };
type CronFileType = { default: CronJobParamsType };
type CronFolderType = { index: CronFileType };
type ResultsType = CronFolderType | CronFileType;

const checkIsDirectory = (
  fileOrDir: ResultsType,
): fileOrDir is CronFolderType => Boolean((fileOrDir as CronFolderType).index);

type ModulesType = RequireDirectoryResult<ResultsType>;

const modules: ModulesType = requireDirectory(module, {
  extensions: [__filename.slice(-2)],
});

const cronJobsList = Object.entries(modules).map(([fileName, fileOrDir]: [string, ResultsType]) => {
  const isDir = checkIsDirectory(fileOrDir);

  if (isDir) {
    return {
      name: fileName,
      params: fileOrDir.index.default,
    };
  }

  return {
    name: fileName,
    params: fileOrDir.default,
  };
});

const runProcesses = () => {
  if (!config.isCronJobsRun) {
    return;
  }

  cronJobsList.forEach((job) => {
    const newJob = new CronJob({
      ...job.params,
      onTick: async () => {
        try {
          showMessage('INFO', job.name, `process ${job.name} is run`);
          await job.params.onTick();
        } catch (err) {
          showMessage('ERROR', job.name, `${err}`);
        }
      },
    });
    newJob.start();
  });
};

export default runProcesses;
