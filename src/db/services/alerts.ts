import Alerts from '../entities/alerts';
import alerts from '..';

const addAlert = async (dateNews: Date, textNews: string) => {
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
export default addAlert;