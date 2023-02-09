import nodeFetch from 'node-fetch';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';

import config from '../config';
import alert from '../db/services/alerts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const cheerioController = async () => {
  try {
    const response = await nodeFetch(config.urlVodokanal);
    const html = await response.textConverted();

    const $ = cheerio.load(html, null, false);
    const tagVodaAlert = $('tbody tbody tr');
    for (let i = 0; i < tagVodaAlert.length; i++) {
      const [data, text] = $(tagVodaAlert[i]).find('td font font');
      const date = $(data).text();
      const textNews = $(text).text().trim();
      const dateNews = dayjs(date.replace(/\s+/g, ''), 'DD.MM.YYYY').toDate();
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
  // onTick: (() => console.log('cheerioController')),
  startNow: false,
  runOnInit: true,
  onComplete: undefined,
  timeZone: undefined,
  context: undefined,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
