import parsingWithPuppeteer from './parsingWithPuppeteer';

export default {
  cronTime: '0 */3 * * * *',
  onTick: parsingWithPuppeteer,
  startNow: false,
  runOnInit: false,
  onComplete: undefined,
  timeZone: undefined,
  context: undefined,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
