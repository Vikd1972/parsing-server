import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import config from '../../config';

import { displayAlert } from '../../db/services/alerts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const parsingWithPuppeteer = async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: true,
    args: ['--use-gl=egl'],
    executablePath: executablePath(),
  });

  const page = await browser.newPage();
  await page.goto(config.url);
  const textSelector = await page.waitForSelector('tr');
  const fullTitle = await textSelector.evaluate((el) => el.textContent);
  const arrayOfAlert = fullTitle.trim().split('\n');

  let dateNews = new Date();
  let textNews = '';
  arrayOfAlert.forEach((alert) => {
    const date = alert.slice(0, 10);
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    dateNews = new Date(date.replace(pattern, '$3-$2-$1'));

    textNews = alert.slice(10).trim();
    if (dateNews.getDay()) {
      displayAlert(dateNews, textNews);
    }
  });

  browser.close();
  log.step(0, 1);
};

export default parsingWithPuppeteer;
