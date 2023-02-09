/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import type { Browser } from 'puppeteer-core';

import config from '../../config';
import proxyService from '../../utils/proxyService';
import searchNotes from './searchNotes';
import createBrowser from '../../utils/createBrowser';
import createPage from '../../utils/createPage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

let isErrorLoading: boolean;

const init = async (proxy: string) => {
  let browser: Browser;
  let attempt = 1;
  do {
    try {
      isErrorLoading = false;
      log.info('proxy', proxy, 'attempt', attempt, 'of 3');

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
        log.error('answer.error', err);
        await browser.close();
        throw new Error('TimeoutBrowser');
      });

      // myBrowser = browser;
      // log.debug('connected');

      await searchNotes(page, browser);
    } catch (error) {
      isErrorLoading = true;
      log.error('proxy server is bad', error.message);
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
