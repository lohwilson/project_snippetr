import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { AuthContext } from "../auth/AuthProvider";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
  margin: 75px 0px;
  margin-left: auto;
  margin-right: auto;
  border: 75px 0px;
`;

const BorderDiv = styled.div`
  border: 5px solid black;
  margin: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
`;

const UserDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin: 20px;
`;
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.props.match);
    console.log(this.context);
    const id = this.props.match.params.id;
    axios
      .get(
        !this.context.useLocal
          ? "http://localhost:4000/snippetr/userSnippets/" + id
          : "https://snippetr.herokuapp.com/snippetr/userSnippets/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          snippets: res.data,
        });
      });
  }

  likeSnippet = (id) => {
    console.log(id);
    fetch(
      !this.context.useLocal
        ? "http://localhost:4000/snippetr/like"
        : "https://snippetr.herokuapp.com/snippetr/like",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ id }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(this.state.snippets);
        const newSnippet = this.state.snippets.map((snippet) => {
          if (snippet.id === result.id) {
            return result;
          } else {
            return snippet;
          }
        });
        this.setState(newSnippet);
        console.log(this.state.snippets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkedLike = () => {
    console.log(this.context.id);
    return true;
  };

  render() {
    const { snippets } = this.state.snippets;
    return (
      <Div>
        <h1>User snippets</h1>
        <div>
          {snippets &&
            snippets.map((snippet, index) => (
              <BorderDiv key={index}>
                <div>
                  <Image src={snippet.image} alt="userImage" />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.checkedLike()}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name="likes"
                        onChange={() => this.likeSnippet(snippet._id)}
                      />
                    }
                    label={snippet.likes.length}
                  />
                </div>
                <div>
                  <Link
                    to={{
                      pathname: "/snippet/" + snippet._id,
                      snippet: snippet,
                      key: snippet._id,
                    }}
                  >
                    <span>{snippet.title}</span>
                  </Link>
                </div>
                <div>
                  <p>{snippet.story}</p>
                </div>
              </BorderDiv>
            ))}
        </div>
      </Div>
    );
  }
}

export default Profile;
