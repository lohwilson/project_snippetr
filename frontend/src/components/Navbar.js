import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../components/auth/auth";
import { AuthContext } from "./auth/AuthProvider";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";


const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  top: 10;
  z-index: 1;
`;

const styledLink = {
  color: "white",
  textDecoration: "none"
}

export class Navbar extends Component {
  static contextType = AuthContext;
  render() {
    console.log(this.context);
    const isLoggedIn = auth.isAuthenticated();
    console.log(isLoggedIn);
    return (
      <React.Fragment>
        <AppBar color="secondary">
          <ToolBar >
              <Button>
                <Link to="/" style={styledLink}>Snippetr</Link>
              </Button>
              <Button>
                <Link to="/about" style={styledLink}>About</Link>
              </Button>
              <Button>
                <Link to="/ourteam" style={styledLink}>Our Team</Link>
              </Button>

              {this.context.username ? (
                <React.Fragment>
                  <Button>
                    <Link to="/dashboard" style={styledLink}>Dashboard</Link>
                  </Button>
                  <Button>
                    <Link to="/dashboard" style={styledLink}>Logout</Link>
                  </Button>
                  <h3>Welcome, {this.context.username}!</h3>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button>
                    <Link to="/login" style={styledLink}>Login</Link>
                  </Button>
                  <Button>
                    <Link to="/signup" style={styledLink}>Sign Up</Link>
                  </Button>
                </React.Fragment>
              )}
          </ToolBar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Navbar;
