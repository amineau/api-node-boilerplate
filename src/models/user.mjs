import Sequelize  from 'sequelize';

export default class UserModel {

  constructor (app) {
    this._app = app;

    this.model = this._app.bridges.db.sequelize.define('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: { type: Sequelize.STRING },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pictureSmall: {
        type: Sequelize.STRING,
        field: 'picture_small'
      },
      pictureMedium: {
        type: Sequelize.STRING,
        field: 'picture_medium'
      },
      pictureLarge: {
        type: Sequelize.STRING,
        field: 'picture_large'
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        field: 'created_at'
      },
      lastLogin: {
        type: Sequelize.DATE,
        field: 'last_login',
        defaultValue: Sequelize.literal('NOW()')
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })

    this.model.sync({force: true})

  }
}
