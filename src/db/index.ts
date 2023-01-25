import dataSource from './dataSource';
import Alerts from './entities/alerts';

const alerts = dataSource.getRepository(Alerts);

export default alerts;
