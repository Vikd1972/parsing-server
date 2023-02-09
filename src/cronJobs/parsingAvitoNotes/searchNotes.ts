/* eslint-disable no-await-in-loop */
import type { Page, Browser } from 'puppeteer-core';

import avito from '../../db/services/avito';
import userEmulator from '../../utils/userEmulator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

let numberOfPages: number;

const searchNotes = async (page: Page, browser: Browser) => {
  const numbers = await page.$('[class^="page-title-count-"]');
  const numberOfAds = +await numbers.evaluate((el) => el.textContent);
  log.debug('connected');
  numberOfPages = Math.ceil(numberOfAds / 50);
  let currentPage = 1;

  while (currentPage <= numberOfPages) {
    if (currentPage > 1) {
      await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    }
    const notes = await page.$$('[class^="iva-item-body-"]');
    const notesArr = Array.from(notes);

    for (const notesItem of notesArr) {
      const result = await notesItem.evaluate((el) => {
        const title = el.querySelector('[class^="title-root-"]').textContent;
        const price = el.querySelector('[class^="price-text-"]').textContent;
        const address = el.querySelector('[class^="geo-root-"]').textContent;
        const description = el.querySelector('[class^="iva-item-text-"]').textContent;
        const date = el.querySelector('[class^="date-root-"]').textContent;
        return {
          title,
          price,
          address,
          description: description.split('\n').join().replace(',,', ''),
          date,
        };
      });
      avito.addAvitoNote(result);
    }
    await userEmulator(page);
    await page.click('[data-marker^="pagination-button/next"]');
    currentPage++;
  }
  await browser.close();
};

export default searchNotes;
