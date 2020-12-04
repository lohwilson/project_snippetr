import React, { Component } from "react";
import axios from "axios";
import auth from "../auth/auth";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthProvider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from '@material-ui/lab/Alert';

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
      error: "",
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
      password: this.state.password,
    };
    // this.context.logIn(this.state.username);

    try {
      fetch("http://localhost:4000/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.error){
          this.setState({error: data.error})
          return
        } else {
          this.context.logIn(data.user);
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          auth.login(() => {
            if (!this.props.location.state) {
              this.props.history.push("/dashboard");
            } else {
              this.props.history.push(this.props.location.state.from.pathname);
            }
          });
        }
      })
    } catch {
      console.log("incorrect login credentials");
    }
  };

  // onLogin = async (event) => {
  //   event.preventDefault();

  //   const user = {
  //     username: this.state.username,
  //     email: this.state.email,
  //     password: this.state.password,
  //   };

  //   this.context.logIn(user);

  //   try {
  //     axios
  //       .post("http://localhost:4000/users/login", user)
  //       .then((res) => console.log(res.data));
  //     auth.login(() => {
  //       if (!this.props.location.state) {
  //         this.props.history.push("/dashboard");
  //       } else {
  //         this.props.history.push(this.props.location.state.from.pathname);
  //       }
  //     });
  //   } catch {
  //     console.log("incorrect login credentials");
  //   }
  // };

  render() {
    return (
      <Div className="container">
        <h3>Log In</h3>
        {this.state.error && (<Alert severity="error">{this.state.error}</Alert>)}
        <form onSubmit={this.onLogin} noValidate autoComplete="off">
          <div>
            <TextField
              label="Username"
              type="text"
              required
              value={this.state.username}
              id="username"
              onChange={this.onChange}
            />
            <h5>Or </h5>
            <TextField
              label="Email"
              type="text"
              value={this.state.email}
              id="email"
              onChange={this.onChange}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              required
              value={this.state.password}
              id="password"
              onChange={this.onChange}
            />
            <br />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              style={{ margin: "10px" }}
            >
              Login
            </Button>
          </div>
        </form>
      </Div>
    );
  }
}

export default Login;
