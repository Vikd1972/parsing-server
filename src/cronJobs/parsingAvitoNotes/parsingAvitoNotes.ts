/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import type { Browser } from 'puppeteer-core';

import config from '../../config';
import proxyService from '../../utils/proxyService';
import searchNotes from './searchNotes';
import createBrowser from '../../utils/createBrowser';
import createPage from '../../utils/createPage';

let isErrorLoading: boolean;

const init = async (proxy: string) => {
  let browser: Browser;
  let attempt = 1;
  do {
    try {
      isErrorLoading = false;
      console.log('\u2554==================');
      console.log('\u2551', '\x1b[33m', 'proxy', proxy, 'attempt', attempt, 'of 3', '\x1b[0m');
      console.log('\u255A==================');

      const browser = await createBrowser(
        [
          '--use-gl=egl',
          '--shm-size=1gb',
          '--enable-blink-features=HTMLImports',
          `--proxy-server=${proxy}`,
        ],
      );

      const page = await createPage(browser);

      await page.goto(config.urlAvitoNotes, {
        waitUntil: 'networkidle2',
        timeout: 0,
      }).catch(async (err) => {
        console.log('\u2554==================');
        console.log('\u2551', '\x1b[31m', 'answer.error', err, '\x1b[0m');
        console.log('\u255A==================');
        await browser.close();
        throw new Error('TimeoutBrowser');
      });

      await searchNotes(page, browser);
    } catch (error) {
      isErrorLoading = true;
      console.log('\u2554==================');
      console.log('\u2551', '\x1b[31m', 'answer.error', 'proxy server is bad', error.message, '\x1b[0m');
      console.log('\u255A==================');
      if (error.message === 'TimeoutBrowser') {
        attempt++;
      } else {
        return;
      }
    }
  } while (attempt <= 3 && isErrorLoading);

  return browser;
};

const parsingAvitoNotes = async () => {
  const proxyArr = await proxyService.getList();
  let browser: Browser;
  for (let i = 0; i < proxyArr.length; i++) {
    const proxy = `${proxyArr[i].url}:${proxyArr[i].port}`;
    browser = await init(proxy);
    if (!isErrorLoading) {
      break;
    }
  }
  await browser.close();
};

export default parsingAvitoNotes;
