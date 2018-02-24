export default class UserRoute {

  constructor (app) {
    this._app = app;
    this.authentified = app.helpers.middleware.authentify
    this.handler = app.handlers.user
  }

  init () {
    this._app.router.get('/user', this.authentified, this.handler.get.bind(this.handler));
    this._app.router.put('/user/profile', this.authentified, this.handler.updateProfile.bind(this.handler));
    this._app.router.put('/user/password', this.authentified, this.handler.updatePassword.bind(this.handler));
    this._app.router.delete('/user', this.authentified, this.handler.delete.bind(this.handler));
  }
}
