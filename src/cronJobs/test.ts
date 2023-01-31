// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const test = () => {
  log.step(0, 0, 1);
};

export default {
  cronTime: '0 */1 * * * *',
  onTick: test,
  startNow: false,
  runOnInit: false,
  onComplete: undefined,
  timeZone: undefined,
  context: undefined,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
