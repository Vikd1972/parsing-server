import dataSource from './dataSource';
import Alerts from './entities/alerts';
import AvitoLinks from './entities/avitoLinks';
import AvitoNotes from './entities/avitoNotes';

const alerts = dataSource.getRepository(Alerts);
const avitoNotes = dataSource.getRepository(AvitoNotes);
const avitoLinks = dataSource.getRepository(AvitoLinks);

export default {
  alerts,
  avitoNotes,
  avitoLinks,
};
