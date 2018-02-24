import Database from './database';
import Rabbitmq from './rabbitmq';
import Redis    from './redis';

export default class BridgesModule {

  constructor (app) {
    this.db = new Database(app);
    this.rabbit = new Rabbitmq(app);
    this.redis = new Redis(app);
  }

  connect () {
    this.db.connect();
    this.rabbit.connect();
    this.redis.connect();
  }
}
