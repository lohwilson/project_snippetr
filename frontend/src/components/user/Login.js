import React, { Component } from "react";
import axios from "axios";
import auth from "../auth/auth";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthProvider";

const Div = styled.div`
  height: 65vh;
`;

export class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    console.log("login");
    // console.log(this.props.location.state.from.pathname);
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    this.context.logIn(user);

    try {
      axios
        .post("http://localhost:4000/users/login", user)
        .then((res) => console.log(res.data));
      auth.login(() => {
        if (!this.props.location.state) {
          this.props.history.push("/dashboard");
        } else {
          this.props.history.push(this.props.location.state.from.pathname);
        }
      });
    } catch {
      console.log("incorrect login credentials");
    }
  };

  render() {
    const errorMessage = this.errorMessage ? <h1></h1> : "";
    return (
      <Div className="container">
        <h3>Log In</h3>
        <form onSubmit={this.onLogin}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              required
              className="form-control col-6"
              value={this.state.username}
              id="username"
              onChange={this.onChange}
              autoComplete="off"
            />{" "}
            <h5>Or </h5> <label htmlFor="email">Email: </label>
            <input
              type="text"
              className="form-control col-6"
              value={this.state.email}
              id="email"
              onChange={this.onChange}
              autoComplete="off"
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              required
              className="form-control col-6"
              value={this.state.password}
              id="password"
              onChange={this.onChange}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Log In" className="btn btn-primary" />
          </div>
        </form>
        {errorMessage}
      </Div>
    );
  }
}

export default Login;
