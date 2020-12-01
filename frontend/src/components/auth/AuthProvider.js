import React, { Component, createContext } from 'react'

export const AuthContext = createContext(null);

export class AuthProvider extends Component {
  state = {
    username: '',
    email: '',
    isAuthenticated: false
  }

  logIn = (user) => {
    console.log('context login');
    console.log('context username', user);
    this.setState({
      username: user.username,
      email: user.email,
      isAuthenticated: true
    })
  }

  logOut = () => {
    this.setState({
      username: '',
      email: '',
      isAuthenticated: false
    })
  }

  render() {
    const { username, email, isAuthenticated } = this.state;
    const { logIn, logOut } = this;
    return (
      <AuthContext.Provider value={{
        username,
        email,
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
