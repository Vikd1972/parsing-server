/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/indent */
import type { Page } from 'puppeteer-core';

const userEmulator = async (page: Page) => {
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
        await page.mouse.move(
          randomNumber(0, 1200), randomNumber(0, 800), { steps: randomNumber(5, 50) },
        );
        break;
      case 3:
        await page.mouse.up();
        break;
      case 4:
        await page.evaluate(
          (y) => { document.scrollingElement.scrollBy(0, y); }, randomNumber(50, 500),
        );
        break;
      default:
        await page.evaluate(
          (y) => { document.scrollingElement.scrollBy(0, y); }, randomNumber(50, 500),
        );
    }
  }
  await page.mouse.up();
  await page.waitForTimeout(randomNumber(500, 5000));
};

export default userEmulator;
