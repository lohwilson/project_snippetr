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
export class Snippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: [],
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    axios.get("http://localhost:4000/snippetr/" + id).then((res) => {
      console.log(res.data);
      this.setState({
        snippet: res.data,
      });
      console.log(this.state);
    });
  }

  handleDelete = async () => {
    console.log("delete snippet");
    console.log(this.props);
    const id = this.props.match.params.id;

    await axios.delete("http://localhost:4000/snippetr/" + id);
    console.log("deleted", id);
    this.props.history.push("/dashboard");
  };

  handleEdit = () => {
    console.log("edit snippet");
    this.setState({ editing: !this.state.editing });
  };

  handleChange = (event) => {
    console.log(event.target);
    this.setState({ [event.target.id]: event.target.value });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    console.log("updating snippet");

    const {title, story} = this.state.snippet;

    const snippet = {
      title,
      story
    }

    console.log(snippet);

  };

  toggleLikes = () => {
    console.log();
  };

  render() {
    const { title, story, image, postedBy, likes } = this.state.snippet;
    console.log(this.context);
    console.log(this.state.snippet.postedBy);
    return (
      <div>
        {!this.state.editing ? (
          <React.Fragment>
            <h1>{title}</h1>
            <h3>{story}</h3>
            <img src={image} alt="userImage" />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="likes"
                  onChange={() => this.toggleLikes()}
                />
              }
            />
            {likes} likes
            <br />
            {postedBy === this.context.id && (
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
        ) : (
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
        )}
        <Link to="/dashboard" className="nav-link">
          Back
        </Link>
      </div>
    );
  }
}

export default Snippets;
