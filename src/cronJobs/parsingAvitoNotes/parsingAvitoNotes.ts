/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import type { Browser } from 'puppeteer-core';

import config from '../../config';
import proxyService from '../../utils/proxyService';
import searchNotes from './searchNotes';
import createBrowser from '../../utils/createBrowser';
import createPage from '../../utils/createPage';
import showMessage from '../../utils/showMessage';

let isErrorLoading: boolean;

const init = async (proxy: string) => {
  let browser: Browser;
  let attempt = 1;
  do {
    try {
      isErrorLoading = false;
      showMessage('WARN', 'parsingAvitoNotes', `proxy ${proxy} attempt ${attempt} of 3`);
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
      }).catch(async () => {
        await browser.close();
        throw new Error('TimeoutBrowser');
      });

      await searchNotes(page, browser);
    } catch (error) {
      isErrorLoading = true;
      showMessage('ERROR', 'parsingAvitoNotes', `proxy server is bad - net::ERR_TIMED_OUT at ${config.urlAvitoNotes}`);
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
