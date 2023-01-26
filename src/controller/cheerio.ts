import alert from '../db/services/alerts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio');

const cheerioController = async (res: string) => {
  try {
    const $ = cheerio.load(res, null, false);
    const tagVodaAlert = $('tbody tbody tr');
    for (let i = 0; i < tagVodaAlert.length; i++) {
      const data = $(tagVodaAlert[i]).find('td font font')[0];
      const date = $(data).text();
      const text = $(tagVodaAlert[i]).find('td font font')[1];
      const textNews = $(text).text() as string;
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dateNews = new Date(date.replace(pattern, '$3-$2-$1'));
      alert.addAlert(dateNews, textNews);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default cheerioController;
