// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const test2 = () => {
  log.step(0, 0, 0, 1);
};

export default {
  cronTime: '*/3 * * * * *',
  onTick: test2,
  onComplete: undefined,
  startNow: false,
  timeZone: undefined,
  context: undefined,
  runOnInit: false,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
