export default class AuthHandler {

  constructor (app) {
    this._app = app;
    this.user = app.models.user.model;
    this.helper = app.helpers.auth;
    this.user = this._app.models.user.model;
  }

  verify (req, res) {

    const updateUser = async (userId) => {
      const user = await this.user.findById(userId)
      if (!user) throw new Error('user_not_found')
      const modifiedUser = await user.update({ activated: true })
      if (!modifiedUser) throw new Error('user_not_modified')
    }

    const userId = this.helper.decodeToken(req.query.token);

    updateUser(userId)
      .then(() => {
        res.status(200).json({success: true});
      })
      .catch((err) => {
        const error = this._app.status.auth[err.message];
        res.status(error.code).json({err: error.message});
      })
  }

  login (req, res) {

    const checkExisting = async (email) => {
      const user = await this.user.findOne({ where: {email: email }});
      if (!user) throw new Error('user_not_found');
      return user;
    };

    const comparePassword = async (user) => {
      await this.helper.comparePassword(req.body.password, user.password)
        .catch(() => {
          console.log('rejected');
          throw new Error('wrong_password');
        })
      console.log(`resolved: userid ${user.id}`)
      return user.id
    }

    const generateToken = (userId) => {
      const token = this.helper.generateToken(userId);

      const json = {
        userId: userId,
        token: token
      };

      return json;
    }

    checkExisting(req.body.email)
      .then(comparePassword)
      .then(generateToken)
      .then((json) => {
        res.status(200).json(json);
      })
      .catch((err) => {
        const error = this._app.status.auth[err.message];
        res.status(error.code).json({err: error.message});
      })
  }

  signup (req, res) {

    const checkExisting = async (email) => {
      const user = await this.user.findOne({ where: {email: email }})
      if (user) throw new Error('user_already_token');
    };

    const hashPassword = () => {
      return this.helper.hashPassword(req.body.password);
    }

    const createUser = async (hash) => {
      const user = {
        email: req.body.email,
        password: hash,
        username: req.body.username,
      }

      const result = await this.user.create(user)
      if (!result.id) throw new Error('user_not_modified');
      return result.id;
    }

    const generateToken = (userId) => {
      const token = this.helper.generateToken(userId);
      const json = {
        userId: userId,
        token: token
      };

      return json;
    }

    checkExisting(req.body.email)
      .then(hashPassword)
      .then(createUser)
      .then(generateToken)
      .then((json) => {
        res.status(200).json(json);
      })
      .catch((err) => {
        const error = this._app.status.auth[err.message];
        res.status(error.code).json({err: error.message});
      })
  }

  logout (req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      res.status(200).json({ success: true });
    });
  }

}
