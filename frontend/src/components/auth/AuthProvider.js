import React, { Component, createContext } from 'react'

export const AuthContext = createContext(null);

export class AuthProvider extends Component {
  state = {
    username: '',
    email: '',
    id: '',
    isAuthenticated: false
  }

  logIn = (user) => {
    console.log('context login');
    console.log('context username', user);
    this.setState({
      username: user.username,
      id: user.id,
      // email: user.email,
      isAuthenticated: true
    })
  }

  logOut = () => {
    console.log('logout');
    this.setState({
      username: '',
      email: '',
      id: '',
      isAuthenticated: false
    })
    localStorage.clear();
  }

  render() {
    const { username, email, id, isAuthenticated } = this.state;
    const { logIn, logOut } = this;
    return (
      <AuthContext.Provider value={{
        username,
        email,
        id,
        isAuthenticated,
        logIn,
        logOut
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider;
