import Mail from './mail';
import Auth from './auth';
import Middleware from './middleware';

export default class HelpersModule {

  constructor (app) {
    this.mail = new Mail(app)
    this.auth = new Auth(app)
    this.middleware = new Middleware(app)
  }
}
