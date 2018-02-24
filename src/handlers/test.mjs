export default class TestHandler {

  constructor (app) {
    this._app = app;
  }

  ping (req, res) {
    res.status(200).send('pong');
  }

  mail (req, res) {
    this._app.bridges.rabbit.sendToMail('mail', {
      'from': '"Quentin 👻" <info@music-room.com>',
      'emails': 'quentin@dequelen.me',
      'subject': 'test mail',
      'template': 'confirm_email',
      'content': {
        'username': 'qdequele',
        'url': 'google.com'
      }
    });
    res.status(200).send('mail sent');
  }

  session (req, res) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  }
}
