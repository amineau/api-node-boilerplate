import User from './user';
import Auth from './auth';
import Test from './test';

export default class RoutesModule {

  constructor (app) {
    this.user = new User(app)
    this.auth = new Auth(app)
    this.test = new Test(app)
  }

  init () {
    this.user.init();
    this.auth.init();
    if (process.env.NODE_ENV === 'development') {
      this.test.init();
    }
  }
}
