import React, { Component, createContext } from "react";

export const UserContext = createContext(null);

export class UserProvider extends Component {
  state = {
    username: "lohwilson",
    email: "lohwilson@hotmail.com",
  };

  setUserData = () => {
    console.log('set user data');
    // this.setState({
    //   username: this.state.username,
    //   email: this.state.email,
    // });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          setUserData: this.setUserData,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;

// export const UserProvider = props => {
//   const [ currentUser, setCurrentUser ] = useState([
//     {
//       username: '',
//       email: ''
//     }
//   ]);
//   return (
//     <UserContext.Provider value={[currentUser, setCurrentUser]}>
//       {props.children}
//     </UserContext.Provider>
//   )
// }
