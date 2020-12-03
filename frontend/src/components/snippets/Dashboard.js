import React, { Component } from "react";
import CreateSnippets from "./CreateSnippets";
import ListAllSnippets from "./ListAllSnippets";
import Search from "./Search";
import Profile from "../user/Profile";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAll: true,
      create: false,
      search: false,
      profile: false,
    };
  }

  listAllSnippets = () => {
    console.log("list all");
    this.setState({
      listAll: true,
      create: false,
      search: false,
      profile: false,
    });
  };

  createSnippets = () => {
    console.log("create");
    this.setState({
      listAll: false,
      create: true,
      search: false,
      profile: false,
    });
  };

  search = () => {
    console.log("search");
    this.setState({
      listAll: false,
      create: false,
      search: true,
      profile: false,
    });
  };

  profile = () => {
    console.log("profile");
    this.setState({
      listAll: false,
      create: false,
      search: false,
      profile: true,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div>
            <ButtonGroup variant="contained" color="primary">
              <Button onClick={this.listAllSnippets}>List All Snippets</Button>
              <Button onClick={this.createSnippets}>Create Snippet</Button>
              <Button onClick={this.search}>Search</Button>
              <Button onClick={this.profile}>Your Profile</Button>
            </ButtonGroup>
          </div>
          <div>
            {this.state.listAll && <ListAllSnippets />}
            {this.state.create && <CreateSnippets />}
            {this.state.search && <Search />}
            {this.state.profile && <Profile />}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
