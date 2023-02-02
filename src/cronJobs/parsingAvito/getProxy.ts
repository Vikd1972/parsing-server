/* eslint-disable no-unreachable-loop */
/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';
import type { Page, Browser } from 'puppeteer-core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

const jobUrl = 'http://free-proxy.cz/ru/proxylist/country/RU/https/ping/all';

const proxyList: Array<{
  url: string;
  port: string;
}> = [];

let page: Page;
let browser: Browser;

class GetProxy {
  static async init() {
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: true,
      args: ['--use-gl=egl'],
      executablePath: executablePath(),
    });
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(jobUrl);
  }

  static async resolve() {
    await this.init();

    const table = await page.$('[id="proxy_list"]');
    const proxiList = await table.$$('tr');
    const proxyArr = Array.from(proxiList);

    for (let i = 0; i < proxyArr.length; i++) {
      const stringProxy = await proxyArr[i].$$('td');
      const stringProxyArr = Array.from(stringProxy);
      const itemProxyArr = [];
      for (let i = 0; i < stringProxyArr.length; i++) {
        const itemProxy = await stringProxyArr[i].evaluate((el) => el.textContent);
        itemProxyArr.push(itemProxy);
      }
      if (itemProxyArr[1]) {
        proxyList.push({
          url: itemProxyArr[0].split('))')[1],
          port: itemProxyArr[1],
        });
      }
    }
    // eslint-disable-next-line no-console
    // console.log('notesList', proxyList);
  }

  static async getJobs() {
    await this.resolve();
    await browser.close();
    log.step(0, 0, 0, 1);
    // console.log('notesList', proxyList);
    return proxyList;
  }
}
export default GetProxy;
