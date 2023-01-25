import dataSource from "./dataSource";
import Alerts from "./entities/alerts";

export default {
  alerts: dataSource.getRepository(Alerts),
};
