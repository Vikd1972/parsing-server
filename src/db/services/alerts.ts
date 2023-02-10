/* eslint-disable no-console */
import Alerts from '../entities/alerts';
import db from '..';

export const addAlert = async (dateNews: Date, textNews: string) => {
  const today = new Date();
  if ((today.getFullYear() === dateNews.getFullYear()) &&
    (today.getMonth() === dateNews.getMonth()) &&
    (today.getDate() === dateNews.getDate())) {
    const todayNews = await db.alerts.findBy({ text: textNews });

    if (!todayNews.length) {
      if (textNews.length) {
        const newAlert = new Alerts();

        newAlert.date = dateNews;
        newAlert.text = textNews;

        await db.alerts.save(newAlert);
      }
    }
  }
};

export const displayAlert = async (dateNews: Date, textNews: string) => {
  const today = new Date();
  if ((today.getFullYear() === dateNews.getFullYear()) &&
    (today.getMonth() === dateNews.getMonth()) &&
    (today.getDate() === dateNews.getDate())) {
    const todayNews = await db.alerts.findBy({ text: textNews });
    if (!todayNews.length) {
      if (textNews.length) {
        console.log('\u2554==================');
        console.log('\u2551', '\x1b[36m', dateNews, '\x1b[0m');
        console.log('\u2551', '\x1b[36m', textNews, '\x1b[0m');
        console.log('\u255A==================');
      }
    }
  }
};

export default { addAlert, displayAlert };
