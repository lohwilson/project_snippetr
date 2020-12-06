import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";

const Div = styled.div`
  margin: 75px 0px;
  text-align: center;
`;

const AlertDiv = styled.div`
  margin: auto;
  width: 50%;
  padding: 20px;
`;

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    };
  }

  componentDidMount() {
    console.log("sign up");
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (!username) {
      this.setState({
        error: "Please enter your username!",
      });
      return;
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      this.setState({
        error: "Invalid email address!",
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: "Passwords do not match!",
      });
      return;
    }

    // const user = {
    //   username,
    //   email,
    //   password,
    // };

    // axios.post('http://localhost:4000/users/signup', user)
    //   .then(res => console.log(res.data))
    //   .then(data => {
    //     console.log(data);
    // })

    fetch(
      process.env.REACT_APP_USE_LOCAL_BACKEND
        ? "http://localhost:4000/users/signup"
        : "https://snippetr.herokuapp.com/users/signup",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
          return;
        } else {
          this.setState({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            error: "",
            success: "Successfully created your account!",
          });
          console.log(this.props);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Div className="container">
        <h1>Create Account</h1>
        <AlertDiv>
          {this.state.error && (
            <Alert severity="error">{this.state.error}</Alert>
          )}
          {this.state.success && (
            <Alert severity="success">{this.state.success}</Alert>
          )}
        </AlertDiv>

        <form onSubmit={this.onSubmit} autoComplete="off">
          <div>
            <TextField
              variant="outlined"
              label="Username"
              type="text"
              value={this.state.username}
              id="username"
              onChange={this.onChange}
              style={{ padding: "0px 0px 10px 0px", width: "50%" }}
            />
            <br />
            <TextField
              variant="outlined"
              label="Email"
              type="text"
              value={this.state.email}
              id="email"
              onChange={this.onChange}
              style={{ padding: "0px 0px 10px 0px", width: "50%" }}
            />
            <br />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              value={this.state.password}
              id="password"
              onChange={this.onChange}
              style={{ padding: "0px 0px 10px 0px", width: "50%" }}
            />
            <br />
            <TextField
              variant="outlined"
              label="Confirm Password"
              type="password"
              value={this.state.confirmPassword}
              id="confirmPassword"
              onChange={this.onChange}
              style={{ padding: "0px 0px 10px 0px", width: "50%" }}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              style={{ margin: "10px" }}
            >
              Sign Up
            </Button>
          </div>
          <div>
            <Link to="/login">Already have an account? Login here!</Link>
          </div>
        </form>
      </Div>
    );
  }
}

export default SignUp;
