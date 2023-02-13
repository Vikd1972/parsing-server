/* eslint-disable no-await-in-loop */
import proxyService from '../utils/proxyService';
import showMessage from './showMessage';

const runProxy = async (foo: (proxy: string) => Promise<boolean>) => {
  try {
    const proxyArr = await proxyService.getList();
    for (let i = 0; i < proxyArr.length; i++) {
      const proxy = `${proxyArr[i].url}:${proxyArr[i].port}`;
      const isErrorLoading = await foo(proxy);
      if (!isErrorLoading) {
        break;
      }
    }
  } catch (error) {
    showMessage('ERROR', 'runProxy', error.message);
  }
};

export default runProxy;
