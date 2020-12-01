
class Auth {
  constructor(){
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    console.log('logged in');
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    console.log(this.authenticated);
    return this.authenticated;
  }
}

export default new Auth()