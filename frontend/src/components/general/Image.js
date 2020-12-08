import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const Div1 = styled.div`
  width: 47%;
  height: 350px;
  margin: 10px 0px 10px 0px;
  color: white;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 15px 15px 15px grey;
`;

const Div2 = styled.div`
  width: 47%;
  height: 350px;
  margin: 10px 0px 10px 0px;
  background-color: black;
  text-align: center;
  padding: 150px;
  box-shadow: 15px 15px 15px grey;
`;

const animate = keyframes`
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
`;

const H1 = styled.h1`
  position: relative;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 70%;
  animation: ${animate} 10s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
`;

export class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }

  toggleImage = () => {
    this.setState({ mouseOver: !this.state.mouseOver });
  };

  render() {
    const { someText, image } = this.props;
    return (
      <React.Fragment>
        {this.state.mouseOver ? (
          <Div1
            style={{ backgroundImage: `url(${image})` }}
            onMouseEnter={() => this.toggleImage()}
            onMouseLeave={() => this.toggleImage()}
          ></Div1>
        ) : (
          <Div2
            onMouseEnter={() => this.toggleImage()}
            onMouseLeave={() => this.toggleImage()}
          >
            <H1>{someText}</H1>
          </Div2>
        )}
      </React.Fragment>
    );
  }
}

export default Image;
