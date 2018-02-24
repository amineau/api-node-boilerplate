import moment   from 'moment';
import jwt      from 'jwt-simple';
import config   from 'config';

export default class MiddlewareHelper {

  constructor (app) {
    this._app = app;
    this.user = app.models.user.model;
    console.log(this.user)
  }

  authentify (req, res, next) {
    const myToken = req.headers.authorization;

    console.log(myToken)

    if (!myToken) {
      res.status(404).send({
        ok: false,
        error: 'token_not_found'
      });
    }

    const decodeToken  = (token) => {
      return new Promise((resolve, reject) => {
        const decoded = jwt.decode(token, config.get('jwt_secret'));

        if (decoded.exp <= moment().format('x')) {
          return reject(new Error('token has expired'));
        }

        console.log(decoded.user)

        return resolve(decoded.user);
      })
    }

    const verifyUserActivation = async (userId) => {
      const user = await this.user.findById(userId);
      console.log(user)
      if (!user) throw new Error('Account not verified');
      return userId;
    }

    console.log(this.user)

    decodeToken(myToken)
      .then(verifyUserActivation)
      .then((userId) => {
        req.userId = userId;
        return next();
      })
      .catch((err) => {
        res.status(401).send({ error: err.message });
      })

  }
}