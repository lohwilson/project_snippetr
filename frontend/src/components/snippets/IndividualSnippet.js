import React, { Component } from "react";
import UserTitle from "./UserTitle";
import SnippetBody from "./SnippetBody";
import SnippetControl from "./SnippetControl";

export class Snippets extends Component {
  render() {
    return (
      <React.Fragment>
        <UserTitle />
        <SnippetBody />
        <SnippetControl />
      </React.Fragment>
    );
  }
}

export default Snippets;
