import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../components/auth/auth";
import { AuthContext } from "./auth/AuthProvider";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

const LeftDiv = styled.div`
  width: 35%;
`;

const RightDiv = styled.div``;

const styledTitleLink = {
  color: "white",
  textDecoration: "none",
  fontFamily: "Grand Hotel, cursive",
  fontSize: "30px",
};

const styledLink = {
  color: "white",
  textDecoration: "none",
};

export class Navbar extends Component {
  static contextType = AuthContext;
  render() {
    console.log(this.context);
    const isLoggedIn = auth.isAuthenticated();
    console.log(isLoggedIn);
    return (
      <React.Fragment>
        <AppBar color="primary">
          <ToolBar>
            <LeftDiv>
              <div>
                <Link to="/" style={styledTitleLink}>
                  Snippetr
                </Link>
              </div>
            </LeftDiv>

            <RightDiv>
              <Button>
                <Link to="/about" style={styledLink}>
                  About
                </Link>
              </Button>
              <Button>
                <Link to="/ourteam" style={styledLink}>
                  Our Team
                </Link>
              </Button>

              {this.context.username ? (
                <React.Fragment>
                  <Button>
                    <Link to="/dashboard" style={styledLink}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button onClick={() => this.context.logOut()}>
                    <Link to="/" style={styledLink}>
                      Logout
                    </Link>
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button>
                    <Link to="/login" style={styledLink}>
                      Login
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/signup" style={styledLink}>
                      Sign Up
                    </Link>
                  </Button>
                </React.Fragment>
              )}
            </RightDiv>
          </ToolBar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Navbar;
