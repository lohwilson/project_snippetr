import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { AuthContext } from "../auth/AuthProvider";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

export class ListAllSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
      open: false,
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log("dashboard mounted");
    axios
      .get(
        !this.context.useLocal
          ? "http://localhost:4000/snippetr/"
          : "https://snippetr.herokuapp.com/snippetr/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          snippets: res.data.reverse(),
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
        axios
          .get(
            !this.context.useLocal
              ? "http://localhost:4000/snippetr/"
              : "https://snippetr.herokuapp.com/snippetr/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              snippets: res.data.reverse(),
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
        axios
          .get(
            !this.context.useLocal
              ? "http://localhost:4000/snippetr/"
              : "https://snippetr.herokuapp.com/snippetr/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              snippets: res.data.reverse(),
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

  handleOpen = () => {
    this.setState({ open: true });
    console.log("handling open");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { snippets } = this.state;
    const allSnippets = snippets.length ? (
      snippets.map((snippet, index) => {
        const { postedBy, image, likes, _id, title, story } = snippet;
        return (
          <BorderDiv key={index}>
            <UserDiv>
              <Link
                to={{
                  pathname: "/users/" + postedBy._id,
                }}
                style={styledUserLink}
              >
                <span>{postedBy.username}</span>
              </Link>
            </UserDiv>
            <div>
              <Image src={image} alt="userImage" />
            </div>
            <LikeDiv>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.checkedLike(likes)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="likes"
                    onChange={() =>
                      this.checkedLike(likes)
                        ? this.unLikeSnippet(_id)
                        : this.likeSnippet(_id)
                    }
                  />
                }
              />
              {likes.length}{" "}
              <span onClick={() => this.handleOpen()}>likes</span>
              <Modal
                open={this.state.open}
                onClose={() => this.handleClose()}
                style={styledModal}
              >
                <div>modal </div>
              </Modal>
            </LikeDiv>
            <TitleDiv>
              <Link
                to={{
                  pathname: "/snippet/" + _id,
                  snippet: snippet,
                  key: _id,
                }}
                style={styledTitleLink}
              >
                <span>{title}</span>
              </Link>
            </TitleDiv>
            <StoryDiv>
              <p>{story}</p>
            </StoryDiv>
          </BorderDiv>
        );
      })
    ) : (
      <div> No Snippets! </div>
    );
    return (
      <div>
        <h1>List all snippets</h1>
        <OverallDiv>{allSnippets}</OverallDiv>
      </div>
    );
  }
}

export default ListAllSnippets;

const OverallDiv = styled.div`
  margin: auto;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

const styledModal = {
  position: "absolute",
  width: "400",
  border: "2px solid #000",
  backgroundColor: "white",
  left: "0",
};

const styledUserLink = {
  color: "black",
  textDecoration: "none",
  textAlign: "left",
};

const UserDiv = styled.div`
  width: 100%
  font-size: 20px;
  font-weight: 900;
  margin: 20px;  
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

const styledTitleLink = {
  color: "black",
  textDecoration: "none",
  fontWeight: "900",
};

const StoryDiv = styled.div`
  width: 100%;
  padding: 10px;
`;
