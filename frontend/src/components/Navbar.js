import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../components/auth/auth";
import { AuthContext } from "./auth/AuthProvider";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import EcoIcon from "@material-ui/icons/Eco";

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

const homeIconStyle = {
  color: "white",
  margin: "5px",
};

export class Navbar extends Component {
  static contextType = AuthContext;
  checkUrl = () => {
    console.log("check");
    console.log(this);
  };

  render() {
    console.log(this.context);
    const isLoggedIn = auth.isAuthenticated();
    console.log(isLoggedIn);
    return (
      <React.Fragment>
        <AppBar color="secondary">
          <ToolBar>
            <LeftDiv>
              <div>
                <Link to="/" style={styledTitleLink}>
                  Snippetr
                </Link>
              </div>
            </LeftDiv>
            <div>
              <Link to="/">
                <HomeIcon style={homeIconStyle} />
              </Link>
            </div>
            <RightDiv>
              <Button>
                <Link to="/about" style={styledLink}>
                  <EcoIcon /> About
                </Link>
              </Button>
              <Button>
                <Link to="/ourteam" style={styledLink}>
                  <EmojiPeopleIcon /> Our Team
                </Link>
              </Button>

              {this.context.username ? (
                <React.Fragment>
                  <Button>
                    <Link to="/dashboard" style={styledLink}>
                      <PhotoAlbumIcon /> Dashboard
                    </Link>
                  </Button>

                  <Button>
                    <Link
                      to={{
                        pathname: "/users/" + this.context.id,
                      }}
                      onClick={() => this.checkUrl()}
                      style={styledLink}
                    >
                      <PersonOutlineIcon /> {this.context.username}
                    </Link>
                  </Button>

                  <Button onClick={() => this.context.logOut()}>
                    <Link to="/" style={styledLink}>
                      <TransferWithinAStationIcon /> Logout
                    </Link>
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button>
                    <Link to="/login" style={styledLink}>
                      <PersonIcon /> Login
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/signup" style={styledLink}>
                      <HowToRegIcon /> Sign Up
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
