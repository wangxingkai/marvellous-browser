import { compose } from 'ramda';
import {
  propValidator,
  isStringInvalid
} from './utils';

/**
 * the user store,
 * 
 * api:
 * all throw exceptions when input is invalid
 * isUserExist (string)=> boolean     - check if user exist, if register user, do this first
 * register ({string, string})=>User  - throw exception when user already exist, 
 * login ({string, string})=>boolean  - check if user's credential is correct.
 * 
 */
class UserStore {
  constructor() {
    this._database = {};
    // register
    this.register = compose(
      this._addUser,
      propValidator(['email', 'password'])
    );

    // check existance
    this.isUserExist = email =>
      !!this._database[email] ||
      isStringInvalid(email);

    // login
    this.login = compose(
      this._validateUser,
      propValidator(['email', 'password'])
    );
  }

  _addUser({ email, password }) {
    if (this.isUserExist(email)) {
      throw new Error(`${email} already exists!`);
    }

    // add to database
    // naive way, not hashing password...
    const user = { password };

    this._database[email] = user;
    return { email };
  }

  _validateUser({ email, password }) {
    const user = this._database[email];
    if (
      typeof user === 'undefined' ||
      user.password !== password
    ) {
      return null;
    } else {
      return email;
    }
  }
}

export default UserStore;
