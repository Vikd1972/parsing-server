/* eslint-disable no-await-in-loop */
import type { Page } from 'puppeteer-core';

import config from '../../config';

const listOfLinks: Array<{
  title: string;
  path: string;
  isChecked: boolean;
}> = [];

const searhLinks = async (page: Page) => {
  const searchArea = await page.$('[id="app"]');
  const linksList = await searchArea.$$('a');
  for (const linksRow of linksList) {
    const itemLink = await linksRow.evaluate((el) => {
      let title = el.textContent
        .replace('\n', ' ')
        .replace('- ', '') as string;

      const pathString = (el.outerHTML as string);

      if (!pathString.includes('href=')) {
        return;
      }

      const path = pathString
        .split(' ')
        .find((item) => item.startsWith('href='))
        .slice(6, pathString.length - 1)
        .split('"')[0]
        .split('?')[0]
        .split('-')[0];
      if (path.startsWith('http')) {
        title = '';
      }
      return {
        title,
        path,
        isChecked: false,
      };
    });

    const endPath = itemLink.path.slice(itemLink.path.length - 10);
    if (!Number(endPath) && itemLink.title) {
      const checkByTitle = listOfLinks.findIndex((item) => item.title === itemLink.title);
      const checkByPath = listOfLinks.findIndex((item) => item.path === itemLink.path);

      if (checkByTitle === -1 && checkByPath === -1) {
        listOfLinks.push({
          ...itemLink,
          path: `${config.urlAvito}${itemLink.path}`,
        });
      }
    }
  }
  return listOfLinks;
};

export default searhLinks;
