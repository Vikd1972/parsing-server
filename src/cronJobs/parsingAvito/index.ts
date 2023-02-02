import Jobs from './parsingAvitoWithClass';

export default {
  cronTime: '0 */15 * * * *',
  onTick: Jobs.getJobs(),
  onComplete: undefined,
  startNow: false,
  timeZone: undefined,
  context: undefined,
  runOnInit: true,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
