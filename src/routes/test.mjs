export default class TestRoute {

  constructor (app) {
    this._app = app;
    this.handler = app.handlers.test
  }

  init () {
    this._app.router.get('/test/ping', this.handler.ping.bind(this.handler));
    this._app.router.get('/test/mail', this.handler.mail.bind(this.handler));
    this._app.router.get('/test/session', this.handler.session.bind(this.handler));
  }
}
