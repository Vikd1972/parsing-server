/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

import config from '../config';

class ProxyService {
  private list: Array<{
    url: string;
    port: string;
  }> = [];

  private isPulled = false;

  private pendingPromise: Promise<void> = null;

  private pullList1 = async () => {
    if (!this.pendingPromise) {
      this.pendingPromise = (async () => {
        const browser = await puppeteer.launch({
          ignoreDefaultArgs: ['--disable-extensions'],
          headless: true,
          args: ['--use-gl=egl'],
          executablePath: executablePath(),
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(config.urlProxyServer);
        const table = await page.$('[id="proxy_list"]');
        const proxiList = await table.$$('tr');
        const proxyArr = Array.from(proxiList);

        for (const proxy of proxyArr) {
          const stringProxy = await proxy.$$('td');
          const stringProxyArr = Array.from(stringProxy);
          const itemProxyArr: string[] = [];
          for (const stringOfProxy of stringProxyArr) {
            const itemProxy = await stringOfProxy.evaluate((el) => el.textContent);
            itemProxyArr.push(itemProxy);
          }
          if (itemProxyArr[1]) {
            this.list.push({
              url: itemProxyArr[0].split('))')[1],
              port: itemProxyArr[1],
            });
          }
        }

        this.isPulled = true;
        this.pendingPromise = null;
        await browser.close();
      })();
    }
    return this.pendingPromise;
  };

  private pullList2 = async () => {
    if (!this.pendingPromise) {
      this.pendingPromise = (async () => {
        const browser = await puppeteer.launch({
          ignoreDefaultArgs: ['--disable-extensions'],
          headless: true,
          args: ['--use-gl=egl'],
          executablePath: executablePath(),
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(config.urlProxyServer2);
        const table = await page.$('[id="table_proxies"]');
        const proxiList = await table.$$('tr');
        const proxyArr = Array.from(proxiList);

        for (const proxy of proxyArr) {
          const stringOfProxy = await proxy.evaluate((el) => el.textContent);
          const arrayOfProxy = stringOfProxy.split('\n').map((item) => item.trim());
          if (parseInt(arrayOfProxy[3], 10)) {
            this.list.push({
              url: arrayOfProxy[2],
              port: arrayOfProxy[3],
            });
          }
        }

        this.isPulled = true;
        this.pendingPromise = null;
        await browser.close();
      })();
    }
    return this.pendingPromise;
  };

  getList = async () => {
    if (!this.isPulled) {
      await this.pullList2();
    }
    return this.list;
  };
}

export default new ProxyService();
