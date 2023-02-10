import Alerts from '../entities/alerts';
import db from '..';
import showMessage from '../../utils/showMessage';

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
        showMessage('INFO', 'db.services.alerts', `${textNews}}`);
      }
    }
  }
};

export default { addAlert, displayAlert };
