import React, { Component } from 'react'
import axios from "axios";
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
// import Alert from '@material-ui/lab/Alert';


const Div = styled.div`
  height: 65vh
`;

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentDidMount(){
    console.log('sign up');
  }

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if(this.state.password !== this.state.confirmPassword){
      console.log('password do not match');
      return
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);

    axios.post('http://localhost:4000/users/signup', user)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
  };

  render() {
    return (
      <Div className="container">
        <h3>Create Account</h3>
        {/* {error.message && (<Alert severity="error">{error.message}</Alert>)} */}
        <form onSubmit={this.onSubmit} autoComplete="off">
          <div className="form-group">
            <TextField
              label="Username" 
              type="text"
              required
              value={this.state.username}
              id="username"
              onChange={this.onChange}
              minLength="5"
            /><br />
            <TextField
              label="Email" 
              type="text"
              required
              value={this.state.email}
              id="email"
              onChange={this.onChange}
              minLength="5"
            /><br />
            <TextField
              label="Password" 
              type="password"
              required
              value={this.state.password}
              id="password"
              onChange={this.onChange}
              minLength="5"
            /><br />
            <TextField
              label="Confirm Password" 
              type="password"
              required
              value={this.state.confirmPassword}
              id="confirmPassword"
              onChange={this.onChange}
              minLength="5"
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
        </form>
      </Div>
    )
  }
}

export default SignUp
