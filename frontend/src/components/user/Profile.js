import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { AuthContext } from "../auth/AuthProvider";
import styled from "styled-components";

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
    console.log(this.props.match.params);
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
        <UserDiv>
          <TopDiv>
            <Img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              alt="user profile pic"
            ></Img>
            <h1>
              {snippets && snippets.length > 0 && (
                <div>
                  <p>{snippets[0].postedBy.username}'s Profile</p>
                </div>
              )}{" "}
            </h1>
          </TopDiv>
        </UserDiv>

        <SnippetDiv>
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
        </SnippetDiv>
      </Div>
    );
  }
}

export default Profile;

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

const SnippetDiv = styled.div``;

const Img = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
`;

const UserDiv = styled.div``;

const BottomDiv = styled.div``;

const TopDiv = styled.div`
  display: inline;
`;
