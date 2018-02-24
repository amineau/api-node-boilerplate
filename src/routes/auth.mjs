import validate from 'express-validation';

export default class AuthRoute {

  constructor (app) {
    this._app = app;
    this.router = app.router;
    this.validation = app.validation.auth;
    this.handler = app.handlers.auth;
    this.authentified = app.helpers.middleware.authentify.bind(app.helpers.middleware)
  }

  init () {
    this.router.get('/auth/verify/:token?', this.handler.verify.bind(this.handler));
    this.router.post('/auth/login', validate(this.validation.login), this.handler.login.bind(this.handler));
    this.router.post('/auth/signup', validate(this.validation.signup), this.handler.signup.bind(this.handler));
  }

}
