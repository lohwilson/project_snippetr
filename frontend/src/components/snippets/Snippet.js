import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../auth/AuthProvider";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import styled from "styled-components";

export class Snippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: [
        {
          postedBy: "",
        },
      ],
      editing: false,
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    axios
      .get(
        !this.context.useLocal
          ? "http://localhost:4000/snippetr/" + id
          : "https://snippetr.herokuapp.com/snippetr/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        this.setState({
          snippet: res.data,
        });
      });
  }

  handleDelete = () => {
    const id = this.props.match.params.id;
    fetch(
      !this.context.useLocal
        ? "http://localhost:4000/snippetr/" + id
        : "https://snippetr.herokuapp.com/snippetr/" + id,
      {
        method: "delete",
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
              ? "http://localhost:4000/snippetr/" + id
              : "https://snippetr.herokuapp.com/snippetr/" + id,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            this.setState({
              snippet: res.data,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.history.push("/dashboard");
  };

  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleChange = (event) => {
    console.log(event.target);
    this.setState({ [event.target.id]: event.target.value });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const { title, story } = this.state.snippet;
    const snippet = {
      title,
      story,
    };
    console.log(snippet);
  };

  likeSnippet = (id) => {
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
        const userId = this.props.match.params.id;
        axios
          .get(
            !this.context.useLocal
              ? "http://localhost:4000/snippetr/" + userId
              : "https://snippetr.herokuapp.com/snippetr/" + userId,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            this.setState({
              snippet: res.data,
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
        const userId = this.props.match.params.id;
        axios
          .get(
            !this.context.useLocal
              ? "http://localhost:4000/snippetr/" + userId
              : "https://snippetr.herokuapp.com/snippetr/" + userId,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            this.setState({
              snippet: res.data,
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

  renderNonEditing = () => {
    const { title, story, image, postedBy, likes, _id } = this.state.snippet;
    return (
      <React.Fragment>
        {postedBy && (
          <UserDiv>
            <span>{postedBy.username}</span>
          </UserDiv>
        )}
        <div>
          <Image src={image} alt="userImage" />
        </div>
        <h1>{title}</h1>
        <h3>{story}</h3>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={likes && this.checkedLike(likes)}
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
        {likes && <span>{likes.length} likes</span>}
        <br />
        {console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", postedBy)}
        {postedBy && postedBy._id === this.context.id && (
          <React.Fragment>
            <Button
              onClick={this.handleDelete}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
            <Button
              onClick={this.handleEdit}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  renderEditing = () => {
    const { title, story, image } = this.state.snippet;
    return (
      <React.Fragment>
        <form onSubmit={this.handleUpdate}>
          <div>
            <TextField
              label="title"
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <label htmlFor="story">
              Story:
              <TextareaAutosize
                rowsMin={5}
                aria-label="minimum height"
                id="story"
                value={story}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <img src={image} alt="userImage" />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              style={{ margin: "10px" }}
            >
              Update Snippet
            </Button>
          </div>
        </form>
        <Button variant="contained" onClick={this.handleEdit}>
          Cancel
        </Button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Div>
        {!this.state.editing ? this.renderNonEditing() : this.renderEditing()}
        <Link to="/dashboard" className="nav-link">
          Back
        </Link>
      </Div>
    );
  }
}

export default Snippets;

const Div = styled.div`
  text-align: center;
  margin: 75px 0px;
  margin-left: auto;
  margin-right: auto;
  border: 75px 0px;
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
