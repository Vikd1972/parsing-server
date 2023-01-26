// eslint-disable-next-line import/no-import-module-exports
import { join } from 'path';

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
