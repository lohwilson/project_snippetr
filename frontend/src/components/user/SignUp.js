import React, { Component } from 'react'
import axios from "axios";
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Alert from '@material-ui/lab/Alert';

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
      confirmPassword: "",
      error: "",
      success: ""
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
    const { username, email, password, confirmPassword} = this.state;
    
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      this.setState({
        error: "Invalid email address"
      })
      return
    }

    if(password !== confirmPassword){
      this.setState({
        error: "Passwords do not match"
      })
      return
    }

    const user = {
      username,
      email,
      password
    };

    // axios.post('http://localhost:4000/users/signup', user)
    //   .then(res => console.log(res.data))
    //   .then(data => {
    //     console.log(data);
    // })

    fetch("http://localhost:4000/users/signup",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
        body:JSON.stringify({
            username,
            password,
            email
        })
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.error){
            console.log(data.error);
            this.setState({error: data.error})
            return
          } else {
            this.setState({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              error: "",
              success: "Successfully created"
            })
            console.log(this.props);
          }
      })
  };

  render() {
    return (
      <Div className="container">
        <h3>Create Account</h3>
        {this.state.error && (<Alert severity="error">{this.state.error}</Alert>)}
        {this.state.success && (<Alert severity="success">{this.state.success}</Alert>)}
        <form onSubmit={this.onSubmit} autoComplete="off">
          <div className="form-group">
            <TextField
              label="Username" 
              type="text"
              value={this.state.username}
              id="username"
              onChange={this.onChange}
            /><br />
            <TextField
              label="Email" 
              type="text"
              value={this.state.email}
              id="email"
              onChange={this.onChange}
            /><br />
            <TextField
              label="Password" 
              type="password"
              value={this.state.password}
              id="password"
              onChange={this.onChange}
            /><br />
            <TextField
              label="Confirm Password" 
              type="password"
              value={this.state.confirmPassword}
              id="confirmPassword"
              onChange={this.onChange}
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
