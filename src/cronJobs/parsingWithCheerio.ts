import nodeFetch from 'node-fetch';
import * as cheerio from 'cheerio';
import config from '../config';

import alert from '../db/services/alerts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const cheerioController = async () => {
  try {
    const response = await nodeFetch(config.url);
    const html = await response.textConverted();

    const $ = cheerio.load(html, null, false);
    const tagVodaAlert = $('tbody tbody tr');
    for (let i = 0; i < tagVodaAlert.length; i++) {
      const data = $(tagVodaAlert[i]).find('td font font')[0];
      const date = $(data).text();
      const text = $(tagVodaAlert[i]).find('td font font')[1];
      const textNews = $(text).text().trim() as string;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dateNews = new Date(date.replace(pattern, '$3-$2-$1'));
      alert.addAlert(dateNews, textNews);
    }
    log.step();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default {
  cronTime: '0 */15 * * * *',
  onTick: cheerioController,
  startNow: false,
  runOnInit: false,
  onComplete: undefined,
  timeZone: undefined,
  context: undefined,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
