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
  margin: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 75px 0px;
  margin-left: auto;
  margin-right: auto;
`;

const BorderDiv = styled.div`
  border: 0.1em solid #d3d3d3;
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  box-shadow: 5px 5px 5px grey;
`;

const Image = styled.img`
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
`;

const LikeDiv = styled.div`
  width: 100%;
  text-align: left;
  padding: 0px 35px;
`;

const TitleDiv = styled.div`
  width: 100%;
  text-align: left;
  padding: 0px 35px;
`;

const StoryDiv = styled.div`
  width: 100%;
  padding: 10px;
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
    window.scrollTo(0, 0);

    const id = this.context.id;
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
        const id = this.context.id;
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
            console.log(res.data);
            this.setState({
              snippets: res.data,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unLikeSnippet = (id) => {
    console.log(id);
    fetch(
      !this.context.useLocal
        ? "http://localhost:4000/snippetr/unlike"
        : "https://snippetr.herokuapp.com/snippetr/unlike",
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
        const id = this.context.id;
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
            console.log(res.data);
            this.setState({
              snippets: res.data,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkedLike = (likesArray) => {
    const id = this.context.id;
    const likeIndex = likesArray.findIndex((likes) => {
      if (likes === id) {
        return likes;
      }
    });
    if (likeIndex === -1) return false;
    return true;
  };

  render() {
    const { snippets } = this.state.snippets;
    return (
      <Div>
        <h1> snippets</h1>
        <div>
          {snippets &&
            snippets.map((snippet, index) => (
              <BorderDiv key={index}>
                <div>
                  <Image src={snippet.image} alt="userImage" />
                </div>
                <LikeDiv>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.checkedLike(snippet.likes)}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name="likes"
                        onChange={() =>
                          this.checkedLike(snippet.likes)
                            ? this.unLikeSnippet(snippet._id)
                            : this.likeSnippet(snippet._id)
                        }
                      />
                    }
                    label={snippet.likes.length}
                  />
                </LikeDiv>
                <TitleDiv>
                  <Link
                    to={{
                      pathname: "/snippet/" + snippet._id,
                      snippet: snippet,
                      key: snippet._id,
                    }}
                  >
                    <span>{snippet.title}</span>
                  </Link>
                </TitleDiv>
                <StoryDiv>
                  <p>{snippet.story}</p>
                </StoryDiv>
              </BorderDiv>
            ))}
        </div>
      </Div>
    );
  }
}

export default Profile;
