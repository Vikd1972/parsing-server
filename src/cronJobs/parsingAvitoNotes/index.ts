import parsingAvitoNotes from './parsingAvitoNotes';

export default {
  cronTime: '0 */15 * * * *',
  onTick: parsingAvitoNotes,
  // onTick: (() => console.log('parsingAvitoNotes')),
  onComplete: undefined,
  startNow: false,
  timeZone: undefined,
  context: undefined,
  runOnInit: true,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
