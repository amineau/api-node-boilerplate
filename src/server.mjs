import bodyParser from 'body-parser';
import express    from 'express';
import session    from 'express-session';
import morgan     from 'morgan';
import log        from 'npmlog';
import cors       from 'cors';
import config     from 'config';
import passport   from 'passport';

import BridgesModule    from './bridges/index';
import HandlersModule   from './handlers/index';
import HelpersModule    from './helpers/index';
import ModelsModule     from './models/index';
import RoutesModule     from './routes/index';

import validation       from './validation/index';
import status           from './status/index';

class App {

  constructor () {
    this.validation = validation.validation;
    this.status = status;

    this.router = express();

    this.bridges = new BridgesModule(this);
    this.models = new ModelsModule(this);
    this.helpers = new HelpersModule(this);
    this.handlers = new HandlersModule(this);
    this.routes = new RoutesModule(this);
  }

  _initMiddleware () {

    const corsOption = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token']
    };

    this.router.use(cors(corsOption));

    this.router.use(bodyParser.json());
    this.router.use(bodyParser.urlencoded({extended: true}));
    this.router.use(bodyParser.text());
    this.router.use(bodyParser.json({ type: 'application/json'}));
    this.router.use(session({
      secret: config.get('sesion_secret'),
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
    }));
    this.router.use(passport.initialize());
    this.router.use(passport.session());

    if (process.env.NODE_ENV === 'test') {
      log.pause()
    } else {
      this.router.use(morgan('dev'));
    }
  }

  start () {
    this._initMiddleware();

    this.routes.init();
    this.bridges.connect();

    this.router.listen({
      port: config.get('server.port'),
      host: config.get('server.host')
    }, (error) => {
      if (error) {
        console.log(`server cannot start on : ${config.get('server.host')}:${config.get('server.port')}`)
      } else {
        console.log(`server start on : ${config.get('server.host')}:${config.get('server.port')}`);
      }
    });
  }
}

const app = new App();

app.start();

export default app.router; // DON'T REMOVE, IT'S FOR TEST !!!!!!!!!!
