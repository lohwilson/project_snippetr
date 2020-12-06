import React, { Component } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { AuthContext } from "../auth/AuthProvider";
import Alert from "@material-ui/lab/Alert";

export class CreateSnippets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      story: "",
      image: "",
      username: "",
      error: "",
      success: "",
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
    const data = new FormData();
    data.append("file", this.state.image);
    data.append("upload_preset", "snippetr");
    data.append("cloud_name", "drfrooljx");

    try {
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
    } catch (err) {
      console.log(err);
    }

    const snippet = {
      title: this.state.title,
      story: this.state.story,
      image: this.state.image,
    };

    fetch(
      process.env.REACT_APP_USE_LOCAL_BACKEND
        ? "http://localhost:4000/snippetr/create"
        : "https://snippetr.herokuapp.com/snippetr/create",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(snippet),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ success: "Successfully created Snippet" });
          console.log(data);
        }
      });

    console.log("snippet created");
  };

  render() {
    return (
      <div>
        {this.state.error && <Alert severity="error">{this.state.error}</Alert>}
        {this.state.success && (
          <Alert severity="success">{this.state.success}</Alert>
        )}
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
