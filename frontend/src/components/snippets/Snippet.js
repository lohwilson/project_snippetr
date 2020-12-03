import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../auth/AuthProvider";
import Icon from "@material-ui/core/Icon";

export class Snippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      story: "",
      image: "",
      username: "",
      likes: 0,
      editing: false,
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id;
    axios.get("http://localhost:4000/snippetr/" + id).then((res) => {
      console.log(res.data);
      this.setState({
        title: res.data.title,
        story: res.data.story,
        image: res.data.image,
        username: res.data.username,
        likes: res.data.likes,
      });
    });
    console.log('@@@@@@@@@@@@@@', this.state);
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
    this.setState({ [event.target.id]: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    console.log("updating snippet");
  };

  render() {
    console.log(this.state);
    const { title, story, image, username, likes } = this.state;
    return (
      <div className="container">
        {/* <div>
          <h1>{title}</h1>
          <h3>{story}</h3>
          <h4>{user}</h4>
          <img src={image} alt="userImage" />
        </div> */}

        {!this.state.editing ? (
          <React.Fragment>
            <h1>{title}</h1>
            <h3>{story}</h3>
            <img src={image} alt="userImage" />
            <br />
            {likes}
            <br />
            {username === this.context.username && (
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
                  className="form-control col-6"
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
                <label htmlFor="image">Image: </label>
                <input
                  type="file"
                  id="image"
                  onChange={this.handleImageChange}
                />
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
