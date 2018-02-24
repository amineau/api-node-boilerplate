import redis     from 'redis';
import config   from 'config';

export default class RedisBridge {

  constructor (app) {
    this._app = app;
  }

  connect () {
    // this.client = redis.createClient(config.get('redis'));
  }

}
