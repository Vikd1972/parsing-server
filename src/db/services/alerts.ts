import Alerts from '../entities/alerts';
import alerts from '..';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

export const addAlert = async (dateNews: Date, textNews: string) => {
  const today = new Date();
  if ((today.getFullYear() === dateNews.getFullYear()) &&
    (today.getMonth() === dateNews.getMonth()) &&
    (today.getDate() === dateNews.getDate())) {
    const todayNews = await alerts.findBy({ text: textNews });

    if (!todayNews.length) {
      if (textNews.length) {
        const newAlert = new Alerts();

        newAlert.date = dateNews;
        newAlert.text = textNews;

        await alerts.save(newAlert);
      }
    }
  }
};

export const displayAlert = async (dateNews: Date, textNews: string) => {
  const today = new Date();
  if ((today.getFullYear() === dateNews.getFullYear()) &&
    (today.getMonth() === dateNews.getMonth()) &&
    (today.getDate() === dateNews.getDate())) {
    const todayNews = await alerts.findBy({ text: textNews });
    if (!todayNews.length) {
      if (textNews.length) {
        log.info(dateNews);
        log.info(textNews);
      }
    }
  }
};

export default { addAlert, displayAlert };
