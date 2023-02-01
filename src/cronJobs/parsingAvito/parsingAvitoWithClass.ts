/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import type { Page, Browser } from 'puppeteer-core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const jobUrl = 'https://www.avito.ru/taganrog/zemelnye_uchastki';

const notesList: Array<{
  title: string;
  price: string;
  address: string;
  description: string;
  date: string;
}> = [];

let page: Page;
let browser: Browser;
let numberOfPages: number;
let currentPage = 1;

class Jobs {
  static async init() {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
      args: ['--use-gl=egl'],
      executablePath: executablePath(),
    });
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({
      width: 1200,
      height: 800,
    });
    await page.goto(jobUrl);
    const numbers = await page.$('[class^="page-title-count-"]');
    const numberOfAds = +await numbers.evaluate((el) => el.textContent);
    numberOfPages = Math.ceil(numberOfAds / 50);
  }

  static async userEmulator(page: Page) {
    const distance = 100; // should be less than or equal to window.innerHeight
    const delay = 100;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await page.waitForTimeout(delay);
    }
    await page.waitForTimeout(3000);
  }

  static async resolve() {
    await this.init();

    while (currentPage < numberOfPages) {
      const notes = await page.$$('[class^="iva-item-body-"]');
      const notesArr = Array.from(notes);

      for (let i = 0; i < notesArr.length; i++) {
        const result = await notesArr[i].evaluate((el) => {
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
        notesList.push(result);
      }
      await this.userEmulator(page);
      await page.click('[data-marker^="pagination-button/next"]');
      await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
      currentPage++;
    }
    // eslint-disable-next-line no-console
    console.log('notesList.length', notesList.length);
    // eslint-disable-next-line no-console
    console.log('notesList', notesList);
    await this.userEmulator(page);
  }

  static async getJobs() {
    const jobs = await this.resolve();
    await browser.close();
    log.step(0, 0, 0, 1);
    return jobs;
  }
}
export default Jobs;
