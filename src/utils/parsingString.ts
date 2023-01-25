const cheerio = require("cheerio");

const parsingString = (res: any) => {
  const $ = cheerio.load(res, null, false)
  const tagVodaAlert = $("tbody tbody tr");
  for (let i = 0; i < tagVodaAlert.length; i++) {
    const data = $(tagVodaAlert[i]).find("td font font")[0],
      dataNews = $(data).text();
    const text = $(tagVodaAlert[i]).find("td font font")[1],
      textNews = $(text).text();
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    const dt = new Date(dataNews.replace(pattern, '$3-$2-$1'));
    console.log(dt);
    console.log(textNews);
  }
}

export default parsingString;
