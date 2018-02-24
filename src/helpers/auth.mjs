import bcrypt   from 'bcrypt';
import moment   from 'moment';
import jwt      from 'jwt-simple';
import config   from 'config';

export default class AuthHelper {

  constructor (app) {
    this._app = app;
  }

  async hashPassword (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePassword (password, hash) {
    await bcrypt.compare(password, hash)
      .catch(e => {
        console.log(`error: ${e}`);
        throw e;
      });
    console.log(`hash: ${hash} - pass: ${password}`);
    return {};
  }

  generateToken (userId) {
    const expires = moment().add(7, 'days')
      .valueOf();
    const token = jwt.encode({
      user: userId,
      exp: expires
    }, config.get('jwt_secret'));

    return token;
  }

  decodeToken (token) {
    const decoded = jwt.decode(token, config.get('jwt_secret'));

    if (decoded.exp <= moment().format('x')) {
      throw new Error('token has expired');
    }

    return decoded.user;
  }
}
