import User  from './user';

export default class UsersModule {

  constructor (app) {
    this.user = new User(app)
  }
}
