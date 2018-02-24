export default class MailHelper {

  constructor (app) {
    this._app = app;
  }

  send (mailContent, mailSubject, mailTo) {
    const data = new Buffer(JSON.stringify({
      from: 'support@musicroom.fr',
      to: mailTo,
      subject: mailSubject,
      html: mailContent,
    }));

    return this._app.bridges.rabbit.send('mail', data);
  }
}
