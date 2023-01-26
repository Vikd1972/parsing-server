import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import parsingString from './parsingString';

const getContent = async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: true,
    args: ['--use-gl=egl'],
    executablePath: executablePath(),
  });

  const page = await browser.newPage();

  await page.goto('http://www.tgnvoda.ru/avarii.php');

  const content = await page.content();
  parsingString(content);
  browser.close();
};

export default getContent;
