import User from './user';
import Auth from './auth';
import Test from './test';

export default class HandlersModule {

  constructor (app) {

    this.user = new User(app)
    this.auth = new Auth(app)
    this.test = new Test(app)

  }
}
