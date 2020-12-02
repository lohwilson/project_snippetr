import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../components/auth/auth";
import { AuthContext } from "./auth/AuthProvider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

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
      <Nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/dashboard" className="navbar-brand">
          <h3>Snippetr</h3>
        </Link>
        <div>
          <ButtonGroup variant="contained" color="secondary">
            <Button startIcon={<SaveIcon />} endIcon={<SaveIcon />}>
              <Link to="/" className="nav-link">
                Save
              </Link>
            </Button>
            <Button startIcon={<DeleteIcon />} endIcon={<DeleteIcon />}>
              <Link to="/" className="nav-link">
                Discard
              </Link>
            </Button>
          </ButtonGroup>




          <div className="navbar-nav">
            <h4 className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </h4>
            <h4 className="navbar-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </h4>
            <h4 className="navbar-item">
              <Link to="/ourteam" className="nav-link">
                Our Team
              </Link>
            </h4>
            <h4 className="navbar-item">
              <Link to="/login" className="nav-link">
                Log In
              </Link>
            </h4>
            <h4 className="navbar-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </h4>
            <h4 className="navbar-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </h4>
            {this.context.username ? (
              <h3>{this.context.username}</h3>
            ) : (
              <React.Fragment>
                <li>Login</li>
                <li>Logout</li>
              </React.Fragment>
            )}
          </div>
        </div>
      </Nav>
    );
  }
}

export default Navbar;
