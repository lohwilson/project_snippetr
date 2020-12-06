import React, { Component } from "react";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
  margin: 75px 0px;
  margin-left: auto;
  margin-right: auto;
  border: 75px 0px;
`;
export class PageNotFound extends Component {
  render() {
    return (
      <Div className="container">
        <h1>Page Doesn't Exist</h1>
      </Div>
    );
  }
}

export default PageNotFound;
