import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.footer`
  background-color: #708090;
  text-align: center;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  color: white;
  padding: 20px;

`;

const Ul = styled.ul`
  list-style-type: none;
`;

export class Footer extends Component {
  render() {
    return (
      <Div>
        <Ul>
          <h3>Technology</h3>
          <li>Javascript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>React</li>
        </Ul>
        <Ul>
          <h3>Dependencies</h3>
          <li>Express</li>
          <li>Mongoose</li>
          <li>Dotenv</li>
          <li>Axios</li>
          <li>Bootstrap</li>
        </Ul>
        <Ul>
          <h3>APIs</h3>
          <li>Map Box</li>
          <li>Countries</li>
        </Ul>
        <p>© {new Date().getFullYear()} Snippetr</p>
      </Div>
    );
  }
}

export default Footer;
