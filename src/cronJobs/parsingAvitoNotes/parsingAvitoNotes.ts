/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import type { Browser } from 'puppeteer-core';

import config from '../../config';
import runProxy from '../../utils/runProxy';
import searchNotes from './searchNotes';
import createPuppeteerPage from '../../utils/createPuppeteerPage';
import showMessage from '../../utils/showMessage';

let isErrorLoading: boolean;

const runSearch = async (proxy: string) => {
  let browser: Browser;
  let attempt = 1;
  do {
    try {
      isErrorLoading = false;
      showMessage('WARN', 'parsingAvitoNotes', `proxy ${proxy} attempt ${attempt} of 3`);
      const { browser, page } = await createPuppeteerPage(
        [
          '--use-gl=egl',
          '--shm-size=1gb',
          '--enable-blink-features=HTMLImports',
          `--proxy-server=${proxy}`,
        ],
      );

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
      showMessage('ERROR', 'parsingAvitoNotes', error.message);
      attempt++;
    }
  } while (attempt <= 3 && isErrorLoading);
  await browser.close();
  return isErrorLoading;
};

const parsingAvitoNotes = async () => {
  await runProxy(runSearch);
};

export default parsingAvitoNotes;
