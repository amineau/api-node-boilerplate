import auth from './auth';

export default {
  validation: {
    auth: {
      login: auth.login,
      signup: auth.signup,
    }
  }

}