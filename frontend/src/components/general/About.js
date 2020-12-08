import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
  margin: 75px 0px 600px 0px;
`;
export class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <Div>
          <h1>Under Maintenance</h1>
        </Div>
      </React.Fragment>
    );
  }
}

export default About;
