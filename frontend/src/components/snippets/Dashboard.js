import React, { Component } from "react";
import CreateSnippets from "./CreateSnippets";
import ListAllSnippets from "./ListAllSnippets";
import Search from "./Search";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { AuthContext } from "../auth/AuthProvider";
import ImageIcon from "@material-ui/icons/Image";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const Div = styled.div`
  text-align: center;
  margin: 75px 0px;
  margin-left: auto;
  margin-right: auto;
  border: 75px 0px;
`;

const ContentDiv = styled.div`
  width: 100%;
  margin: 50px 0px;
`;

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
  static contextType = AuthContext;

  componentDidMount() {
    window.scrollTo(0, 0);
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
    const { listAll, create, search } = this.state;

    return (
      <React.Fragment>
        <Div className="container">
          <div>
            <ButtonGroup variant="contained" color="primary">
              <Button onClick={this.listAllSnippets}>
                <ImageIcon /> List All Snippets
              </Button>
              <Button onClick={this.createSnippets}>
                {" "}
                <AddPhotoAlternateIcon /> Create Snippet
              </Button>
              <Button onClick={this.search}>
                {" "}
                <ImageSearchIcon /> Search
              </Button>
            </ButtonGroup>
          </div>
          <ContentDiv>
            {listAll && <ListAllSnippets />}
            {create && <CreateSnippets />}
            {search && <Search />}
          </ContentDiv>
        </Div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
