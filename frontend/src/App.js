import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import AuthProvider from "./components/auth/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Content from "./components/Content";

const Div = styled.div`
  background-image: url(https://i.pinimg.com/originals/4d/55/61/4d5561a98fe7d21e8cbbdf5d87675050.jpg);
  background-size: cover;
  z-index: 1;
  margin: auto;
  color: white;
  height: 100%;
  width: 100%;
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
    return (
      <Router>
        <Div>
          <AuthProvider>
            <Navbar />
            <Content currentUser={this.state.currentUser} />
            <Footer />
          </AuthProvider>
        </Div>
      </Router>
    );
  }
}

export default App;
