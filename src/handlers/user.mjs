export default class UserHandler {

  constructor (app) {
    this._app = app;
    this.user = this._app.models.user.model;
  }

  get (req, res) {

    const finish = ((data) => {
      res.status(200).json(data);
    }, (err) => {
        res.status(400).json({ error: err });
      });

    const getUserInformation = async (userId) => {
      const user = await this.user.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        email: user.email,
        username: user.username,
        avatar: user.avatar
      };
    };

    getUserInformation(req.userId).then(finish);
  }

  modify (req, res) {
    this._app.helpers.mail.send('test', 'test', 'quentin@dequelen.me');
    res.status(200).json({ success: true });
  }

  updateProfile (req, res) {
    const updateUserProfile = async (id, email, username, password) => {
      const hash = await this._app.helpers.auth.hashPassword(password);

      return this.user.update({
        email: email,
        username: username
      }, {
        where: {
          id: id,
          password: hash
        }
      });
    }

    updateUserProfile(req.userId, req.body.email, req.body.username, req.body.password)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }

  updatePassword (req, res) {
    const updateUserPassword = async (id, password, newPassword) => {
      const hash = await this._app.helpers.auth.hashPassword(password);
      const newHash = await this._app.helpers.auth.hashPassword(newPassword);

      return this.user.update({
        password: newHash
      }, {
        where: {
          id: id,
          password: hash
        }
      });
    }

    updateUserPassword(req.userId, req.body.password, req.body.newPassword)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }

  delete (req, res) {
    const deleteUserAccount = async (id, password) => {
      const hash = await this._app.helpers.auth.hashPassword(password);

      return this.user.destroy({
        where: {
          id: id,
          password: hash
        }
      });
    }

    deleteUserAccount(req.userId, req.body.password)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
}
