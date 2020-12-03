import React, { Component } from "react";
import axios from "axios";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { AuthContext } from "../auth/AuthProvider";

export class CreateSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      story: "",
      image: "",
      username: "",
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    console.log("create snippet component mounted");
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  createNewSnippet = async (event) => {
    event.preventDefault();

    console.log(this.context);
    const data = new FormData();
    data.append("file", this.state.image);
    data.append("upload_preset", "snippetr");
    data.append("cloud_name", "drfrooljx");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drfrooljx/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await response.json();
    await this.setState({
      image: result.url,
    });
    console.log(result);

    const snippet = {
      title: this.state.title,
      story: this.state.story,
      image: this.state.image,
      username: this.context.username,
      likes: 0,
    };

    console.log(snippet);

    axios
      .post("http://localhost:4000/snippetr/create", snippet)
      .then((res) => console.log(res.data))
      .then(() => {
        this.setState({
          title: "",
          story: "",
          image: "",
        });
      });
    console.log("snippet created");
    // this.props.history.push('/dashboard')
  };

  render() {
    return (
      <div>
        <form onSubmit={this.createNewSnippet}>
          <div>
            <TextField
              label="title"
              type="text"
              id="title"
              value={this.state.title}
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
                value={this.state.story}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label htmlFor="image">Image: </label>
            <input type="file" id="image" onChange={this.handleImageChange} />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              style={{ margin: "10px" }}
            >
              Create Snippet
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateSnippets;
