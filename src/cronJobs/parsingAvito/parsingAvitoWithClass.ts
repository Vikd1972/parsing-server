/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import type { Page, Browser } from 'puppeteer-core';

import GetProxy from './getProxy';

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
let isErrorLoading: boolean;
let currentPage = 1;

class Jobs {
  static async init(proxy: string) {
    try {
      isErrorLoading = false;
      browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        headless: false,
        timeout: 30000,
        args: [
          '--use-gl=egl',
          `--proxy-server=${proxy}`,
        ],
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
    } catch (error) {
      isErrorLoading = true;
      log.error('proxy server is bad', error);
      await browser.close();
    }
  }

  static async userEmulator(page: Page) {
    const randomNumber = (min: number, max: number) => {
      return Math.round(Math.random() * (max - min) + min);
    };

    const isEmulation = async () => {
      const isRun = await page.evaluate(() => {
        const currentScroolPoition = document.scrollingElement.scrollTop + window.innerHeight;
        if (currentScroolPoition < document.scrollingElement.scrollHeight) {
          return true;
        }
        return false;
      });
      return isRun;
    };

    while (await isEmulation()) {
      const randomChoice = randomNumber(1, 5);
      switch (randomChoice) {
        case 1:
          await page.waitForTimeout(randomNumber(10, 100));
          break;
        case 2:
          await page.mouse.move(randomNumber(0, 1200), randomNumber(0, 800), { steps: randomNumber(5, 50) });
          break;
        case 3:
          await page.mouse.up();
          break;
        case 4:
          await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, randomNumber(50, 500));
          break;
        default:
          await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, randomNumber(50, 500));
      }
    }
    await page.mouse.up();
    await page.waitForTimeout(randomNumber(500, 5000));
  }

  static async resolve() {
    const proxyArr = await GetProxy.getJobs();
    for (let i = 0; i < proxyArr.length; i++) {
      const proxy = `${proxyArr[i].url}:${proxyArr[i].port}`;
      log.info('proxy', proxy);
      await this.init(proxy);
      if (!isErrorLoading) {
        break;
      }
    }

    while (currentPage <= numberOfPages) {
      if (currentPage > 1) {
        await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
      }
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
