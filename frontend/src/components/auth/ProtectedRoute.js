import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import { AuthContext } from "./AuthProvider";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if(auth.isAuthenticated()){
          return <Component {...props} />;
        }
        else {
          return (
            <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              }
            }}
            />
          );
        }
      }}
    />
  );
};

// export class ProtectedRoute extends Component {
//   static contextType = AuthContext;
//   render() {
//     console.log(this.props.component);
//     const Component = this.props.component;
//     const isAuthenticated = this.context.isAuthenticated;
//     console.log(isAuthenticated);
//     return isAuthenticated ? (
//       <Component />
//     ) : (
//       <Redirect to={{ pathname: "/login", state: { from: this.props.location } }} />
//     );
//   }
// }

// export default ProtectedRoute;
