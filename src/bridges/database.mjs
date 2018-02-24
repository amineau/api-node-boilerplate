import Sequelize   from 'sequelize';
import config      from 'config';

export default class DatabaseBridge {

  constructor (app) {
    this._app = app;

    this.sequelize = new Sequelize(config.get('database.name'), config.get('database.user'), config.get('database.pass'), {
      host: config.get('database.host'),
      dialect: 'postgres',
      port: config.get('database.port'),
      logging: false
    });

    /*
    -----------------------------------------------------
    THIS BLOCK SHOULD REPLACE THE ABOVE CONNECTION METHOD
    -----------------------------------------------------
    this.sequelize = new Sequelize({
      host: config.get('database.host'),
      port: config.get('database.port'),
      dialect: 'postgres',
      logging: false,
      operatorsAliases: Sequelize.Op,
      database: config.get('database.name'),
      username: config.get('database.user'),
      password: config.get('database.pass')
    });
    */
  }

  connect () {
    return this.sequelize.authenticate()
  }

}
