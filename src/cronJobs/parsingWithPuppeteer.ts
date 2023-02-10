import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import dayjs from 'dayjs';

import config from '../config';
import { displayAlert } from '../db/services/alerts';

const parsingWithPuppeteer = async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: true,
    args: ['--use-gl=egl'],
    executablePath: executablePath(),
  });

  const page = await browser.newPage();
  await page.goto(config.urlVodokanal);
  const textSelector = await page.waitForSelector('tr');
  const fullTitle = await textSelector.evaluate((el) => el.textContent);
  const arrayOfAlert = fullTitle.trim().split('\n');

  let textNews = '';
  arrayOfAlert.forEach((alert) => {
    const date = alert.slice(0, 10);
    const dateNews = dayjs(date.replace(/\s+/g, ''), 'DD.MM.YYYY').toDate();

    textNews = alert.slice(10).trim();
    if (dateNews.getDay()) {
      displayAlert(dateNews, textNews);
    }
  });

  browser.close();
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
