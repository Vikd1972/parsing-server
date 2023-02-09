import parsingAvitoLinks from './parsingAvitoLinks';

export default {
  cronTime: '0 */15 * * * *',
  onTick: parsingAvitoLinks,
  // onTick: (() => console.log('parsingAvitoLinks')),
  onComplete: undefined,
  startNow: false,
  timeZone: undefined,
  context: undefined,
  runOnInit: true,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
