import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const parsingAvito = async () => {
  // log.step(0, 0, 0, 1);
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: false,
    args: ['--use-gl=egl'],
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto('https://www.avito.ru/taganrog/zemelnye_uchastki');
  // const www = await page.$('[class^="index-root-"]');
  const notes = await page.$$('[class^="iva-item-body-"]');
  const notesArr = Array.from(notes);

  const notesList: Array<{
    title: string;
    price: string;
    address: string;
    description: string;
    date: string;
  }> = [];

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
        description,
        date,
      };
    });
    notesList.push(result);
  }
  // });
  log.step(0, 0, 0, 1);
  // eslint-disable-next-line no-console
  console.log('notesList', notesList);
};

export default parsingAvito;
