/* eslint-disable no-param-reassign */
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer';

type OptionsType = {
  args: string[];
};

class MyPuppeteer {
  args: string[];

  constructor(options: OptionsType) {
    this.args = options.args;
  }

  browserInit = async () => {
    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
      args: this.args,
      executablePath: executablePath(),
    });

    return browser;
  };
}

export default MyPuppeteer;
