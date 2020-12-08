import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
    };
  }

  componentDidMount() {
    console.log("search mounted");
  }

  handleResult = (value) => {
    axios
      .get(
        !this.context.useLocal
          ? "http://localhost:4000/snippetr/title" + value
          : "https://snippetr.herokuapp.com/snippetr/title" + value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
    //return an array of snippets
  };

  handleChange = (event) => {
    console.log("seaching");
    this.setState({ [event.target.id]: event.target.value });

    // const results = handleResult(event.target.value);
    // this.setState({ results });
  };

  handleSearch = (event) => {
    event.preventDefault();
    console.log(this.state.search);
    const value = this.state.search;
    axios
      .get(
        !this.context.useLocal
          ? "http://localhost:4000/snippetr/title/" + value
          : "https://snippetr.herokuapp.com/snippetr/title/" + value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Div>
        <h1>Looking for something? Search here!</h1>
        <form onSubmit={this.handleSearch}>
          <label htmlFor="search"></label>
          <input
            id="search"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              style={{ margin: "15px" }}
            >
              Search
            </Button>
          </div>
        </form>
        <div>
          {this.state.results && (
            <div>
              {this.state.results.map((result) => (
                <div>{result.title}</div>
              ))}
            </div>
          )}
        </div>
      </Div>
    );
  }
}

export default Search;

const Div = styled.div`
  margin: 0px 0px 400px 0px;
`;
