import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

// import { displayAlert } from '../db/services/alerts';
// 'https://www.avito.ru/taganrog/zemelnye_uchastki'

const avitoController = async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: true,
    args: ['--use-gl=egl'],
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  await page.goto('https://www.avito.ru/taganrog/zemelnye_uchastki');
  await page.waitForSelector('[class^="index-root-"]');
  // const result: string[][] = [];
  const result = await page.evaluate(() => {
    const searchResults = Array.from(document.querySelectorAll('[class^="iva-item-body-"]')).length;
    // console.log(searchResults);

    const dateNews = [];

    for (let i = 1; i < searchResults - 1; i++) {
      const productNodes = Array.from(document.querySelectorAll('[class^= "iva-item-body-"]'));
      const productsDetails = productNodes.map((el) => el.textContent);
      dateNews.push(productsDetails);
    }

    return dateNews;
  });

  // eslint-disable-next-line no-console
  console.log('result', result[1]);
  // const arrayOfAlert = fullTitle.trim().split('\n');
};

export default avitoController;
