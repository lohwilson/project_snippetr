import React, { Component } from "react";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  componentDidMount() {
    console.log("search mounted");
  }

  handleChange = (event) => {};

  render() {
    return (
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <input type="submit" value="Search"></input>
        </form>
      </div>
    );
  }
}

export default Search;
