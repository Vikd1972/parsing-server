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
    await page.goto(jobUrl);
  }

  static async resolve() {
    await this.init();
    const notes = await page.$$('[class^="iva-item-body-"]');
    const notesArr = Array.from(notes);

    // notesArr.map(async (note) => {
    for (let i = 0; i < notesArr.length; i++) {
      // const result = await note.evaluate((el) => {
      // eslint-disable-next-line no-await-in-loop
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
    // });
    // eslint-disable-next-line no-console
    console.log('notesList', notesList);
  }

  static async getJobs() {
    const jobs = await this.resolve();
    await browser.close();
    log.step(0, 0, 0, 1);
    // console.log(jobs)
    return jobs;
  }
}
export default Jobs;
