import dayjs from 'dayjs';

import config from '../config';
import createPuppeteerPage from '../utils/createPuppeteerPage';
import { displayAlert } from '../db/services/alerts';

const parsingWithPuppeteer = async () => {
  const { browser, page } = await createPuppeteerPage([
    '--use-gl=egl',
    '--shm-size=1gb',
    '--enable-blink-features=HTMLImports',
  ]);

  await page.goto(config.urlVodokanal);
  const textSelector = await page.waitForSelector('tr');
  const fullTitle = await textSelector.evaluate((el) => el.textContent);
  const arrayOfAlert = fullTitle.trim().split('\n');
  let textNews = '';
  arrayOfAlert.forEach((alert) => {
    const date = alert.slice(0, 10);
    const dateFormat = dayjs(date.replace(/\s+/g, ''), 'DD.MM.YYYY').format('DD.MM.YYYY');
    const dateNews = dayjs(dateFormat, 'DD.MM.YYYY').toDate();

    textNews = alert.slice(10).trim();
    if (dateNews.getDay()) {
      displayAlert(dateNews, textNews);
    }
  });

  await browser.close();
};

export default {
  cronTime: '0 */3 * * * *',
  onTick: parsingWithPuppeteer,
  // onTick: (() => console.log('parsingWithPuppeteer')),
  startNow: false,
  runOnInit: true,
  onComplete: undefined,
  timeZone: undefined,
  context: undefined,
  utcOffset: undefined,
  unrefTimeout: undefined,
};
