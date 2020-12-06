import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import AuthProvider from "./components/auth/AuthProvider";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import StickyFooter from "./components/StickyFooter";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const Div = styled.div`
  z-index: 1;
  margin: auto;
  height: 100%;
`;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      logout: () => this.logout(),
    };
  }
  render() {
    console.log(process.env);
    return (
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Div>
            <AuthProvider>
              <Navbar />
              <Content
                currentUser={this.state.currentUser}
                style={{ marginTop: "40px" }}
              />
              <StickyFooter />
            </AuthProvider>
          </Div>
        </Container>
      </Router>
    );
  }
}

export default App;
