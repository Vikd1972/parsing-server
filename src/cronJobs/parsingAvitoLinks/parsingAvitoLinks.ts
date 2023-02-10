/* eslint-disable no-console */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import type { Browser } from 'puppeteer-core';

import avito from '../../db/services/avito';
import searhLinks from './searchLinks';
import config from '../../config';
import createBrowser from '../../utils/createBrowser';
import createPage from '../../utils/createPage';

const init = async (url: string) => {
  let browser: Browser;
  let attempt = 0;
  while (attempt < 3) {
    try {
      const browser = await createBrowser(
        [
          '--use-gl=egl',
          '--shm-size=1gb',
          '--enable-blink-features=HTMLImports',
        ],
      );

      const page = await createPage(browser);

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 0,
      });

      const linksList = await searhLinks(page);

      return { linksList, browser };
    } catch (error) {
      console.log('\u2554==================');
      console.log('\u2551', '\x1b[31m', 'error', error, '\x1b[0m');
      console.log('\u255A==================');
      attempt++;
      await browser.close();
    }
  }
};

const parsingAvitoLinks = async () => {
  const { linksList, browser } = await init(config.urlAvito);
  let listOfLinks = linksList.filter((item) => item.isChecked === false);
  do {
    console.log('\u2554==================');
    console.log('\u2551', '\x1b[33m', 'number of new array links', listOfLinks.length, '\x1b[0m');
    console.log('\u255A==================');
    for (let item of listOfLinks) {
      console.log('\u2554==================');
      console.log('\u2551', '\x1b[36m', 'check of', item.path, '\x1b[0m');
      console.log('\u255A==================');
      await init(item.path);
      item = {
        ...item,
        isChecked: true,
      };
      await avito.addAvitoLink(item);
    }
    listOfLinks = linksList.filter((item) => item.isChecked === false);
  } while (listOfLinks);
  await browser.close();
};

export default parsingAvitoLinks;
