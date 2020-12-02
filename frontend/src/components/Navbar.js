import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../components/auth/auth";
import { AuthContext } from "./auth/AuthProvider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  top: 10;
  z-index: 1;
  padding: 20px;
`;

export class Navbar extends Component {
  static contextType = AuthContext;
  render() {
    console.log(this.context);
    const isLoggedIn = auth.isAuthenticated();
    console.log(isLoggedIn);
    return (
      <Nav>
        <div>
            <Button>
              <Link to="/">Snippetr</Link>
            </Button>
            <Button>
              <Link to="/about">About</Link>
            </Button>
            <Button>
              <Link to="/ourteam">Our Team</Link>
            </Button>

            {this.context.username ? (
              <React.Fragment>
                <Button>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button>
                  <Link to="/dashboard">Logout</Link>
                </Button>
                <h3>Welcome, {this.context.username}!</h3>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </React.Fragment>
            )}
        </div>
      </Nav>
    );
  }
}

export default Navbar;
